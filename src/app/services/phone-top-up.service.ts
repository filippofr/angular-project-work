import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { AuthService } from './auth.service';
import { BankAccount } from '../interfaces/bank-account';

@Injectable({
  providedIn: 'root'
})
export class PhoneTopUpService {
  private apiUrl = 'https://projectworkits.azurewebsites.net';

  constructor(private jwtSrv: JwtService,
    private http: HttpClient,
    private authSrv: AuthService) { }

    phoneTopUp(phoneNumber: string, amount: number, phoneOperator: string) {

      
      let bankAcc: BankAccount | null;
      this.authSrv.currentAccount$.subscribe((bankAccount) => {
        bankAcc = bankAccount;
      });
      const token = this.jwtSrv.getToken();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      const requestBody = { bankAccount: bankAcc!.id, phoneNumber: phoneNumber, phoneOperator: phoneOperator, amount: amount };
      
      if (bankAcc!.id !== null || bankAcc!.id !== undefined) {
        this.http.post("https://projectworkits.azurewebsites.net/api/transaction/phoneTopUp",  requestBody , { headers } )
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
      } else {
        console.log(bankAcc!.id);
        console.log("Non riuscito");
      }
      }
}
