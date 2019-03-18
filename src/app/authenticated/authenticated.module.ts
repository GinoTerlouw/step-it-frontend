import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthenticatedRoutingModule} from './authenticated-routing.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthenticatedRoutingModule,
  ],
  exports: [
    RouterModule
  ]
})
export class AuthenticatedModule {
}
