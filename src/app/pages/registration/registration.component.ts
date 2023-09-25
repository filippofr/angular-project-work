import { Component } from '@angular/core';

export interface SignUpClass{
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

}
