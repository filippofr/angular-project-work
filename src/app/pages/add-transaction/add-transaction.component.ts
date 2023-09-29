import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AddTransactionService } from 'src/app/services/add-transaction.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent {

  transactionForm = this.fb.group({    
    category: ['', {validators: Validators.required}],
    amount: ['', {validators: Validators.required}],
    description: ['', {validators: Validators.required}]
  })

  transactionError = '';

  constructor(protected fb: FormBuilder,
    private addSrv: AddTransactionService)
   { 

   }


   transaction(){
    if(this.transactionForm.valid){
      const { category, amount, description } = this.transactionForm.value; 
      const numberAmount = parseFloat(amount!);
      this.addSrv.addMoney(category!, numberAmount, description!)
    }
    else{
      console.log("errore, transazione fallita");
    }
  }

  }


