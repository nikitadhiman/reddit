import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpClientService {

  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  private privateData = {
    status: null,
    data: null,
    bizerror: null,
    syserror: null,
    errortype: null,
    message: null
  };

  private openErrorPopup = new Subject<number>();

  openErrorPopup$ = this.openErrorPopup.asObservable();

  constructor(private http: Http) { }

  get(url): Observable<any> {
    return this.http.get(url)
      .map(response => response.json() as any)
      .catch(error => this.handleError(error));
  }

  post(url, body): Observable<any> {
    return this.http.post(url, body, { headers: this.headers })
      .map(response => response.json() as any)
      .catch(error => this.handleError(error));
  }

  handleError(error: any) {
    let closeLoader = true;
    if (error.status === 500) {
      this.openErrorPopup.next(error.status);
      return Observable.throw(error || 'Server Error');
    }
    if (error.headers.get('Location')) {
      closeLoader = false;
      window.location.href = error.headers.get('Location');
    }

    if (error.status) {
      window.location.href = '#/error/' + error.status;
    } else {
      window.location.href = '#/error/0';
    }
    return Observable.throw(error || 'Server Error');
  }

  private handleResponse(dataToParse: any) {
    this.privateData.status = dataToParse.status;
    if (dataToParse.status === 'success') {
      this.privateData.data = dataToParse.data;
      if (dataToParse.hasOwnProperty('message')) {
        this.privateData.message = dataToParse.message;
      }
    } else {
      this.privateData.errortype = dataToParse.msgType;
      if (dataToParse.msgType === 'biz') {
        this.privateData.bizerror = dataToParse.error.message;
      } else if (dataToParse.msgType === 'sys') {
        this.privateData.syserror = dataToParse.error.message;
      }
    }
    return this.privateData;
  }
}
