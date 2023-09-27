import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavUserComponent } from './components/nav-user/nav-user.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { TransactionComponent } from './pages/transaction/transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    NavBarComponent,
    NavUserComponent,
    ChangePasswordComponent,
    HomeComponent,
    ProfileComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faUser);
  }
}
