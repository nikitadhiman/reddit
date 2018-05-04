import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { CoreModule } from '../core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { IndividualpageComponent } from './individualpage/individualpage.component';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    IndividualpageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    CoreModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
