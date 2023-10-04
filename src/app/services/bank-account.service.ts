import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../interfaces/category';
import { Transaction } from '../interfaces/transaction';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  private _transactions$ = new BehaviorSubject<Transaction[]>([]);
  transactions$ = this._transactions$.asObservable();

  constructor(private http: HttpClient,
    private authSrv: AuthService
  ) {
    // authSrv.currentAccount$.subscribe(account => {
    //   if(account){
    //     this.listTransaction(account.id!);
    //   } else {
    //     this._transactions$.next([]);
    //   }
    // })
  }

  listTransaction(bankAccountId: string, record?: number, category?: string, firstDate?: Date, secondDate?: Date) {
    // const { record, category, firstDate, secondDate } = filters;
    return this.http.post<Transaction[]>(`/api/transaction/list`, {
      bankAccount: bankAccountId,
      record: record,
      category: category,
      firstDate: firstDate,
      secondDate: secondDate
    })
      // .subscribe(trans => this._transactions$.next(trans));
  }

  listCategory() {
    return this.http.get<Category[]>(`/api/category/list`);
  }


}
