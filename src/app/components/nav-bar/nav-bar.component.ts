import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  currentUser$ = this.authSrv.currentUser$;
  
  constructor(protected authSrv: AuthService) {  }

  logout() {
    this.authSrv.logout();
  }
}
