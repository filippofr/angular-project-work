import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { BankAccount } from '../interfaces/bank-account';
import { Transaction } from '../interfaces/transaction';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  private _transactions$ = new BehaviorSubject<Transaction[]>([]);
  transactions$ = this._transactions$.asObservable();

  constructor(private http: HttpClient,
              private authSrv: AuthService
  ) { 
    authSrv.currentAccount$.subscribe(account => {
      if(account){
        this.listTransaction(account.id!);
      } else {
        this._transactions$.next([]);
      }
    })
  }

  listTransaction(bankAccountId: string, record?: number) {
    this.http.post<Transaction[]>(`/api/transaction/list`, {bankAccount: bankAccountId, record: record})
      .subscribe(trans => this._transactions$.next(trans));
  }

  
}
