import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuActionsComponent } from './pages/menu-actions/menu-actions.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegistrationComponent } from './pages/registration/registration.component';
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
    component: LandingPageComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
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
