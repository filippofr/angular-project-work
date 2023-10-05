import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeIt from '@angular/common/locales/it';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarDays, faFileExcel } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight, faFilter, faUser } from '@fortawesome/free-solid-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalDetailsComponent } from './components/modal-details/modal-details.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavUserComponent } from './components/nav-user/nav-user.component';
import { TransactionCardComponent } from './components/transaction-card/transaction-card.component';
import { TransactionsFilterComponent } from './components/transactions-filter/transactions-filter.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuActionsComponent } from './pages/menu-actions/menu-actions.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { TransactionEntrataPipe } from './pipes/transaction-entrata.pipe';
import { TransactionUscitaPipe } from './pipes/transaction-uscita.pipe';

registerLocaleData(localeIt, 'it-IT')
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faUser, faInfo, faMobile,faShield, faPhone } from '@fortawesome/free-solid-svg-icons';




@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    LandingPageComponent,
    NavBarComponent,
    NavUserComponent,
    HomeComponent,
    ProfileComponent,
    TransactionsComponent,
    MenuActionsComponent,
    TransactionCardComponent,
    TransactionsFilterComponent,
    TransactionUscitaPipe,
    TransactionEntrataPipe,
    ModalDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    CurrencyPipe,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'it-IT' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faUser, faArrowRight, faCalendarDays, faFilter, faFileExcel);
 
  constructor(library: FaIconLibrary){
    library.addIcons(faUser, faArrowRight, faInfo, faMobile, faShield, faPhone);
  }
  
 }
}
