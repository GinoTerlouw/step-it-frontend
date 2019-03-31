import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../auth/auth.guard';
import {HomeComponent} from '../components/home/home.component';

const authenticatedRoutes: Routes = [
  {
    path: 'me',
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'start', pathMatch: 'full'},
      {path: 'start', component: HomeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(authenticatedRoutes)],
  exports: [RouterModule]
})
export class AuthenticatedRoutingModule {
}
