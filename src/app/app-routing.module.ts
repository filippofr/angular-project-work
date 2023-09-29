import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { PhoneTopUpComponent } from './pages/phone-top-up/phone-top-up.component';
import { AddTransactionComponent } from './pages/add-transaction/add-transaction.component';
import { MenuActionsComponent } from './pages/menu-actions/menu-actions.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },  
  {
    path: 'signup',
    component: RegistrationComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'transaction',
    component: TransactionComponent,
    canActivate:[authGuard]
  },
  {
    path: 'phoneTopUp',
    component: PhoneTopUpComponent,
    canActivate:[authGuard]
  },
  {
    path: 'refill',
    component: AddTransactionComponent,
    canActivate:[authGuard]
  },
  {
    path: 'menu-actions',
    component: MenuActionsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
