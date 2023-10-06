import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { AuthService } from './auth.service';
import { BankAccount } from '../interfaces/bank-account';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhoneTopUpService {
  private apiUrl = 'https://projectworkits.azurewebsites.net';

  constructor(private jwtSrv: JwtService,
    private http: HttpClient,
    private authSrv: AuthService,
    private router: Router) { }

    phoneTopUp(phoneNumber: string, amount: number, phoneOperator: string): Observable<void> {
      return new Observable<void>(subscriber => {
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
          this.http.post("/api/transaction/phoneTopUp", requestBody, { headers })
            .subscribe(
              () => {
                // Gestisci la risposta dal backend qui
                console.log("Riuscito");
                subscriber.next();
                subscriber.complete();
              },
              (error) => {
                // Gestisci l'errore qui
                console.error("Errore:", error);
                subscriber.error(error);
              }
            );
        } else {
          console.log(bankAcc!.id);
          console.log("Non riuscito");
        }
      });
    }
}
