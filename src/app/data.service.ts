import { Injectable } from '@angular/core';
import { HttpClientService } from '../core/http-client.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private service: HttpClientService,private http: HttpClient) { }

  parentURL: any = 'https://www.reddit.com';
  fullPage:any;
  getFirstPageData()
  {
    return this.service.get(this.parentURL+'/.json');
  }

  getPostPage(postLink)
  {
    return this.service.get(this.parentURL+postLink+'.json'); 
  }

  
}
