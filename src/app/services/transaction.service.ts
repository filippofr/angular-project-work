import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { AuthService } from './auth.service';
import { BankAccount } from '../interfaces/bank-account';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'https://projectworkits.azurewebsites.net';

  constructor(private jwtSrv: JwtService,
    private http: HttpClient,
    private authSrv: AuthService,
    private router: Router) { }

  transaction(iban: string, amount: number, description: string){

    
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
      this.http.post("/api/transaction/bankTransfer",  {bankAccount, iban, amount, description} , { headers } )
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
        this.router.navigate(['menu-actions']);
    } else {
      console.log(bankAcc!.id);
      console.log("Non riuscito");
    }

  }

}
