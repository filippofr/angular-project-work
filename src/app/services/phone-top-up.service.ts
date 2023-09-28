import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class PhoneTopUpService {/*
  private apiUrl = 'https://projectworkits.azurewebsites.net';

  constructor(private jwtSrv: JwtService,
    private http: HttpClient) { }

    phoneTopUp(phoneNumber: string, amount: number, phoneOperator: string) {

      const bankId = "6515790ad7fa0ef10d9f3b2f";
       const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJWaW5jZW56byIsImxhc3ROYW1lIjoiTWlsYW5pIiwiZnVsbE5hbWUiOiJWaW5jZW56byBNaWxhbmkiLCJpZCI6IjY1MTU3OTBhZDdmYTBlZjEwZDlmM2IyYSIsImlhdCI6MTY5NTkxMjE0MSwiZXhwIjoxNjk2NTE2OTQxfQ.VqmuVBY2DAMSJxLxbRaZEptuRzPXa02odZy2tps14_A"
       const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      const bankAccount = bankId;
      const requestBody = { bankAccount: bankId, phoneNumber: phoneNumber, phoneOperator: phoneOperator, amount: amount };
      if (bankId !== null || bankId !== undefined) {
        this.http.post("https://projectworkits.azurewebsites.net/api/transaction/phoneTopUp/",  requestBody , { headers } )
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
        console.log(bankId);
        console.log("Non riuscito");
      }
      }*/
}
