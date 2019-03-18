import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app-component/app.component';
import {JwtService} from './services/jwt/jwt.service';
import {LocalstorageService} from './services/localstorage/localstorage.service';
import {HeaderComponent} from './components/header/header.component';
import {LoginComponent} from './components/login/login.component';
import {TestComponent} from './components/test/test.component';
import {ContentComponent} from './components/content/content.component';
import {AuthenticatedModule} from './authenticated/authenticated.module';
import {SignupComponent} from './components/signup/signup.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }, {
    path: 'signup',
    component: SignupComponent
  }, {
    path: 'test',
    component: TestComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    TestComponent,
    ContentComponent,
    SignupComponent
  ],
  imports: [
    AuthenticatedModule,
    RouterModule.forRoot(
      appRoutes,
      // {enableTracing: true}
    ),
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [JwtService, LocalstorageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
