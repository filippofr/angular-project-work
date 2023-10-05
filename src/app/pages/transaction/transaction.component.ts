import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { TransactionService } from 'src/app/services/transaction.service';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {

  transactionForm = this.fb.group({    
    iban: ['', {validators: [Validators.minLength(28), Validators.maxLength(28), Validators.required]}],
    amount: ['', {validators: [Validators.min(0.01), Validators.required]}],
    description: ['', {validators: Validators.required}]
  })

  transactionError : boolean = false;

  constructor(protected fb: FormBuilder,
    private transSrv: TransactionService)
   { 

   }


  transaction(){
    if(this.transactionForm.valid){
      const { iban, amount, description } = this.transactionForm.value; 
      const numberAmount = parseFloat(amount!);      
      this.transactionForm.reset();
      this.transSrv.transaction(iban!, numberAmount, description!)
    }
    else{
      this.transactionError = true;
      console.log("errore, transazione fallita");
    }
  }

}
