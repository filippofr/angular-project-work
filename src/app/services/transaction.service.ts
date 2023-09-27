import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private jwtSrv: JwtService,
    private http: HttpClient) { }

  transaction(iban: string, amount: number, description: string){

    //const bankId = this.jwtSrv.getBankId();
    const bankId = "651421fa5d360374644e2371";
    if(bankId == null || bankId == undefined){
    this.http.post('/api/transaction/bankTransfer', {bankId, iban, amount, description})
    console.log(bankId);
    return console.log("riuscito");
}
else{
    return console.log("non riuscito");
}

  }

}
