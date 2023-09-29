import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, map, of, tap } from "rxjs"
import { JWTService } from "./jwt.service";
import { User } from "../interfaces/user";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser$ = new BehaviorSubject< User | null>(null);
  currentUser$ = this._currentUser$.asObservable();

  constructor(private jwtSrv: JWTService,
    private http: HttpClient,
    private router: Router) {
      if (this.jwtSrv.hasToken()) {
        this.fetchUser();
        }
     }

     registration(firstName: string, lastName: string, username:string, password: string){
      return this.http.post<{user: User, token: string}>('api/register', {firstName, lastName, username, password })
     }

     private fetchUser() {
      this.http.get<User>('/api/users/me')
      .pipe(
        catchError(_ => {
          this.jwtSrv.removeToken();
          return of(null);
        })
      )
      }
    }
