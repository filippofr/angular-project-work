import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = this.fb.group({
    username: ['', { validators: Validators.required }],
    password: ['', { validators: Validators.required }]
  })

  loginError = '';
a:any
  private destroyed$ = new Subject<void>();

  constructor(protected fb: FormBuilder,
    private authSrv: AuthService,
    private router: Router) { }


  ngOnInit(): void {
    this.loginForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.loginError = '';
      });

    this.a = setTimeout(() => {
      this.router.navigate(['home']);
      // window.location.reload();
    }, 30000);  //30s
    
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    clearTimeout(this.a)
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authSrv.login(username!, password!)
        .pipe(
          catchError(err => {
            this.loginError = err.error.message;
            return throwError(() => err);
          })
        )
        .subscribe(() => {
          this.router.navigate(['menu-actions'])
        });
    }
  }
}
