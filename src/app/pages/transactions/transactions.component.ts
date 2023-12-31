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
  constructor(private authSrv: AuthService,
    private bankAccSrv: BankAccountService
  ) {
    
  }

  account!: BankAccount;

  lastTransaction!: Transaction;
  transactions: Transaction[] = [];

  page = 1;
  pageSize = 5;

  fileName = 'MovimentiEasybank.xlsx';

  listaVuota = false;


  private destroyed$ = new Subject<void>();

  

  ngOnInit(): void {
    this.authSrv.currentUser$.subscribe(user => {
      console.log(user)
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
          this.listaVuota = false;
        }
        if (trans.length === 0) {
          this.listaVuota = true;
        }
      })
  }

  export(): void {
    const formatTrans = this.transactions.map(transaction => {
      return {
        bankAccountId: transaction.bankAccount.id,
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
