import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeIt from '@angular/common/locales/it';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarDays, faFileExcel } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight, faFilter, faInfo, faMobile, faPhone, faShield, faUser } from '@fortawesome/free-solid-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalDetailsComponent } from './components/modal-details/modal-details.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavUserComponent } from './components/nav-user/nav-user.component';
import { TransactionCardComponent } from './components/transaction-card/transaction-card.component';
import { TransactionsFilterComponent } from './components/transactions-filter/transactions-filter.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AddTransactionComponent } from './pages/add-transaction/add-transaction.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuActionsComponent } from './pages/menu-actions/menu-actions.component';
import { PhoneTopUpComponent } from './pages/phone-top-up/phone-top-up.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { TransactionEntrataPipe } from './pipes/transaction-entrata.pipe';
import { TransactionUscitaPipe } from './pipes/transaction-uscita.pipe';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

registerLocaleData(localeIt, 'it-IT')




@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    LandingPageComponent,
    NavBarComponent,
    NavUserComponent,
    ProfileComponent,
    TransactionComponent,
    PhoneTopUpComponent,
    AddTransactionComponent,
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
    library.addIcons(
      faUser,
      faArrowRight,
      faCalendarDays,
      faFilter,
      faFileExcel,
      faInfo,
      faMobile,
      faShield,
      faPhone
    );

  }
}
