import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { BankAccount } from '../interfaces/bank-account';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AddTransactionService {

  private apiUrl = 'https://projectworkits.azurewebsites.net';
  

  constructor(private jwtSrv: JwtService,
    private authSrv: AuthService,
    private http: HttpClient,
    private router: Router) { }

    addMoney(category: string, amount: number, description: string){

    
      let bankAcc: BankAccount | null;
      this.authSrv.currentAccount$.subscribe((bankAccount) => {
        bankAcc = bankAccount;
      });
      const token = this.jwtSrv.getToken();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      const bankAccount = bankAcc!.id;
      if (bankAcc!.id !== null || bankAcc!.id !== undefined) {
        this.http.post("https://projectworkits.azurewebsites.net/api/transaction/add",  {bankAccount, category, amount, description} , { headers } )
          .subscribe(
            (response) => {
              // Gestisci la risposta dal backend qui
              console.log("Riuscito:", response);
            },
            (error) => {
              // Gestisci l'errore qui
              console.error("Errore:", error);
            }
          );
          this.router.navigate(['home']);
      } else {
        console.log(bankAcc!.id);
        console.log("Non riuscito");
      }
  
    }
  

}
