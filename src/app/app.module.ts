import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserService} from './service/user.service';
import {AuthInterceptor} from './interceptor/AuthInterceptor';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import {DetailsGuardGuard} from './security/details-guard.guard';
import {LoginGuardGuard} from './security/login-guard.guard';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'login', component: UserFormComponent, canActivate: [LoginGuardGuard]},
  { path: 'register', component: UserRegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'details', component: UserDetailsComponent, canActivate: [DetailsGuardGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    UserRegisterComponent,
    UserDetailsComponent,
    ErrorPageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, DetailsGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
