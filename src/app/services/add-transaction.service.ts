import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AddTransactionService {

  private apiUrl = 'https://projectworkits.azurewebsites.net';

  constructor(private jwtSrv: JwtService,
    private http: HttpClient) { }

  transaction(category: string, amount: number, description: string){

    //const bankId = this.jwtSrv.getBankId();
    
    const bankId = "650c42cc5ca64778f0497e2b";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJTdGVmYW5pYSIsImxhc3ROYW1lIjoiVmVyZGkiLCJmdWxsTmFtZSI6IlN0ZWZhbmlhIFZlcmRpIiwiaWQiOiI2NTE0MjFmYTVkMzYwMzc0NjQ0ZTIzNmMiLCJpYXQiOjE2OTU4MTk1MzEsImV4cCI6MTY5NjQyNDMzMX0.uvKJJs5zz7zuHRAhEfyU7pkvRDwaCHWZhWfyXATrpuk";
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    if(bankId !== null || bankId !== undefined){
    this.http.post("https://projectworkits.azurewebsites.net/api/transaction/add", {bankId, category, amount, description}, {headers})
    console.log(bankId);
    return console.log("riuscito");
}
else{
    console.log(bankId);
    return console.log("non riuscito");
}

  }

}
