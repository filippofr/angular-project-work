import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BankAccount } from 'src/app/interfaces/bank-account';
import { Transaction } from 'src/app/interfaces/transaction';
import { AuthService } from 'src/app/services/auth.service';
import { BankAccountService } from 'src/app/services/bank-account.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {

  account!: BankAccount;

  lastTransaction!: Transaction;
  transactions: Transaction[] = [];

  page = 1;
  pageSize = 5;

  fileName = 'MovimentiEasybank.xlsx';


  private destroyed$ = new Subject<void>();

  constructor(private authSrv: AuthService,
    private bankAccSrv: BankAccountService
  ) {
    this.authSrv.currentUser$.subscribe(user => {
      if (user) {
        this.authSrv.currentAccount$.subscribe(acc => {
          if (acc) {
            this.account = acc;
            this.bankAccSrv.listTransaction(acc.id!).subscribe(trans => {
              if (trans) {
                this.transactions = trans;
                this.lastTransaction = trans[0];
              }
            })
          }
        })
      }
    })
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  setFilters(value: any) {
    this.bankAccSrv.listTransaction(
      this.account!.id!,
      value.record,
      value.category,
      value.firstDate,
      value.secondDate
    )
      .subscribe(trans => {
        if (trans) {
          this.transactions = trans;
        }
      })
  }

  export(): void {
    const formatTrans = this.transactions.map(transaction => {
      return {
        bankAccountId: transaction.bankAccount.id!,
        date: transaction.date,
        balance: transaction.balance,
        categoryName: transaction.category.name,
        description: transaction.description,
        amount: transaction.amount
      }
    })
    /* pass here the table id */
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formatTrans);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}
