import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { BankAccount } from 'src/app/interfaces/bank-account';
import { AuthService } from 'src/app/services/auth.service';
import { confPassValidator } from 'src/app/validators/confirm-pass-validator';
import { passwordValidator } from 'src/app/validators/password-validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  account!: BankAccount;
  isCollapsed = true;
  changePassError = '';
  changePassResult = '';

  changePassForm = this.fb.group({
    oldPass: ['', { validators: [Validators.required] }],
    password: ['', {
      validators: [Validators.required,
      Validators.min(8),
      passwordValidator()]
    }],
    passwordRep: ['', { validators: [Validators.required] }]
  }, {
    validators: [confPassValidator()]
  })

  private destroyed$ = new Subject<void>();

  constructor(private authSrv: AuthService,
    protected fb: FormBuilder) {
    authSrv.currentAccount$.subscribe(account => {
      if (account) {
        this.account = account
      }

    })
  }

  ngOnInit(): void {
    this.changePassForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.changePassError = '';
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  changePass() {
    if (this.changePassForm.valid) {
      const { oldPass, password } = this.changePassForm.value;
      this.authSrv.update(oldPass!, password!)
        .pipe(
          catchError(err => {
            this.changePassError = err.error.message;
            return throwError(() => err);
          })
        )
        .subscribe(res => {
          this.changePassResult = res.message;
        })
    }

  }
}
