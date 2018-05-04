import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { IndividualpageComponent } from './individualpage/individualpage.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'fullPage', redirectTo: 'IndividualpageComponent'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
  	useHash: true
  })],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
