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
import {ContentComponent} from './components/content/content.component';
import {AuthenticatedModule} from './authenticated/authenticated.module';
import {SignupComponent} from './components/signup/signup.component';
import {HamburgerMenuComponent} from './components/hamburger-menu/hamburger-menu.component';
import {MenuComponent} from './components/menu/menu.component';
import {GeneralStateService} from './services/generalState/general-state.service';
import {HomeComponent} from './components/home/home.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConnectivityCheckService} from './services/connectivityCheck/connectivity-check.service';

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
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ContentComponent,
    SignupComponent,
    HamburgerMenuComponent,
    MenuComponent,
    HomeComponent
  ],
  imports: [
    AuthenticatedModule,
    RouterModule.forRoot(
      appRoutes,
      // {enableTracing: true}
    ),
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    JwtService,
    LocalstorageService,
    JwtService,
    GeneralStateService,
    ConnectivityCheckService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
