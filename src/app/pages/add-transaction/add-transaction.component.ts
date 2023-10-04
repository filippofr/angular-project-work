import { ANIMATION_MODULE_TYPE, Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { faUnderline } from '@fortawesome/free-solid-svg-icons';
import { AddTransactionService } from 'src/app/services/add-transaction.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent  implements OnInit {

  transactionForm = this.fb.group({    
    description: ['', {validators: Validators.required}]
  })

  transactionError : boolean = false;
  euro: string = "";
  amount: string = "";
  insert: string = "";

  constructor(protected fb: FormBuilder,
    private addSrv: AddTransactionService)
   { 

   }

   ngOnInit(): void {
    this.insert = "Inserire l'importo da prelevare/depositare:"; 
   }



  pushMoney(){
    if(this.transactionForm.valid){
      const numberAmount = parseFloat(this.amount);
      if(numberAmount !== null || numberAmount !== undefined){
      const { description } = this.transactionForm.value; 
      const category = "650c36dd4fbb7705e5fe4fd3";
      this.addSrv.addMoney(category!, numberAmount, description!)
      this.insert = "Hai depositato";
    }
    else{
      this.insert = "Importo obbligatorio";
    }
    }
    else{
      this.transactionError = true;
      this.insert = "Descrizione richiesta";
    }
  }


  pullMoney(){
    if(this.transactionForm.valid){
      const numberAmount = parseFloat(this.amount);
      if(numberAmount !== null || numberAmount !== undefined){
      const { description } = this.transactionForm.value; 
      const category = "650c37094fbb7705e5fe4fd7";
      this.addSrv.addMoney(category!, numberAmount, description!)
      this.insert = "Hai prelevato";
    }
    else{
      this.insert = "Importo obbligatorio";
    }
    }
    else{
      this.transactionError = true;
      this.insert = "Descrizione richiesta";
    }
  }

  handleButtonClick(value: number) {
    
if(this.euro == ""){
  this.euro = "€";
this.amount = this.amount+value;
}
else{
  this.amount = this.amount+value;
}

  }

  handleCancelButtonClick() {

    this.amount = "";
    this.euro = "";
  }

  handleDeleteButtonClick() {

    this.amount = this.amount.slice(0, -1);
    if(this.amount == ""){
      this.euro = "";
    }

  }



  }


