import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../auth/auth.guard';
import {TestComponent} from '../components/test/test.component';

const authenticatedRoutes: Routes = [
  {
    path: 'me',
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'start', pathMatch: 'full'},
      {path: 'start', component: TestComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(authenticatedRoutes)],
  exports: [RouterModule]
})
export class AuthenticatedRoutingModule {
}
