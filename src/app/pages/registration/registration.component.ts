import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

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
export class RegistrationComponent implements OnDestroy, OnInit {

  registerForm = this.fb.group({
    firstName: ['', {validators: Validators.required}],
    lastName: ['', {validators: Validators.required}],
    username: ['', {validators: Validators.required}],
    password: ['', {validators: Validators.required}],
    passwordRep: ['', {validators: Validators.required}],
  })
  private destroyed$ = new Subject<void>();

  registrationError='';

  constructor(protected fb: FormBuilder, private router: Router, private authSrv: AuthService,){}

  registration(){
    if (this.registerForm.valid){
      const {firstName, lastName, username, password, passwordRep } = this.registerForm.value;
      this.authSrv.registration(firstName!, lastName!, username!, password!, passwordRep!).pipe(
        catchError(err => {
          this.registrationError = err.error.message;
          console.log(this.registerForm)
          return throwError(()=> err)
        })
      )
      .subscribe(()=>{
        this.router.navigate(['/home'])
      })
      
    }
  }

  ngOnInit(): void {
    this.registerForm.valueChanges
    .pipe(
      takeUntil(this.destroyed$)
    )
    .subscribe(()=> {
      this.registrationError='';
    });
  }
  

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
