import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavUserComponent } from './components/nav-user/nav-user.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faFilter, faUser } from '@fortawesome/free-solid-svg-icons';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { PhoneTopUpComponent } from './pages/phone-top-up/phone-top-up.component';
import { AddTransactionComponent } from './pages/add-transaction/add-transaction.component';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { MenuActionsComponent } from './pages/menu-actions/menu-actions.component';
import { TransactionCardComponent } from './components/transaction-card/transaction-card.component';
import { TransactionsFilterComponent } from './components/transactions-filter/transactions-filter.component';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { TransactionUscitaPipe } from './pipes/transaction-uscita.pipe';
import { TransactionEntrataPipe } from './pipes/transaction-entrata.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ModalDetailsComponent } from './components/modal-details/modal-details.component';

registerLocaleData(localeIt, 'it-IT')

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    NavBarComponent,
    NavUserComponent,
    HomeComponent,
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
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    CurrencyPipe
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
    library.addIcons(faUser, faArrowRight, faCalendarDays, faFilter);
  }
}
