import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientService } from './http-client.service';

@NgModule({
  imports: [
    HttpModule
  ],
  declarations: [],
  providers: [HttpClientService]
})
export class CoreModule { }
