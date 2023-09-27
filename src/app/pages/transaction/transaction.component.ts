import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { TransactionService } from 'src/app/services/transaction.service';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {

  transactionForm = this.fb.group({    
    iban: ['', {validators: Validators.required}],
    amount: ['', {validators: Validators.required}],
    description: ['', {validators: Validators.required}]
  })

  constructor(protected fb: FormBuilder,
    private transSrv: TransactionService)
   { 

   }


  transaction(){
    if(this.transactionForm.valid){
      const { iban, amount, description } = this.transactionForm.value; 
      const numberAmount = parseFloat(amount!);
      this.transSrv.transaction(iban!, numberAmount, description!)
    }
    else{
      console.log("errore, transazione fallita");
    }
  }

}
