import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, map, of, tap } from "rxjs";
import { BankAccount } from "../interfaces/bank-account";
import { User } from "../interfaces/user";
import { JwtService as JWTService } from "./jwt.service";


@Injectable({providedIn: 'root'})
export class AuthService implements OnInit {
  private _currentUser$ = new BehaviorSubject<User | null>(null);
  currentUser$ = this._currentUser$.asObservable();

  private _currentAccount$ = new BehaviorSubject<BankAccount | null>(null);
  currentAccount$ = this._currentAccount$.asObservable();

  constructor(
    private jwtSrv: JWTService,
    private http: HttpClient,
    private router: Router
  ) {
    if (this.isLoggedIn()) {
      this.fetchUser();
      this.currentAccount();
    }
    
  }


  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.fetchUser();
      this.currentAccount();
    }
  }

  registration(firstName: string, lastName: string, username: string, password: string, confPassword: string) {
    return this.http.post<{ user: User, token: string }>('api/register', { firstName, lastName, username, password, confPassword })
  }

  isLoggedIn() {
    return this.jwtSrv.hasToken();
  }

  login(username: string, password: string) {
    // this.http.post<{user: User, account: BankAccount, token: string}>('https://projectworkits.azurewebsites.net/api/login', {username, password}).pipe(
    //   tap(res => this._currentAccount$.next(res.account)),
    //   tap(res => this.jwtSrv.setToken(res.token)),
    //   tap(res => this._currentUser$.next(res.user)),
    //   map(res => res.user)
    // );
    return this.http.post<{user: User, token: string}>('https://projectworkits.azurewebsites.net/api/login', {username, password})
      .pipe(
        tap(res => this.jwtSrv.setBankId(res.user.id!)),
        tap(res => this.jwtSrv.setToken(res.token)),
        tap(res => this._currentUser$.next(res.user)),
        map(res => res.user)
        
      );
  }

  logout() {
    this.jwtSrv.removeToken();
    this.jwtSrv.removeBankId();
    this._currentUser$.next(null);
    this.router.navigate(['home']);
  }

  update(oldPassword: string, newPassword: string) {
    return this.http.post<{message: string}>('https://projectworkits.azurewebsites.net/api/reset', {oldPassword, newPassword})
  }

  userLogdIn() {
    this.fetchUser();
    this.currentAccount();
  }

  private fetchUser() {
    this.http.get<User>('https://projectworkits.azurewebsites.net/api/users/me')
      .subscribe(user => this._currentUser$.next(user));
  }
  private currentAccount(){
    this.http.get<BankAccount>('https://projectworkits.azurewebsites.net/api/account')
      .subscribe(account => this._currentAccount$.next(account))
  }
}

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private _currentUser$ = new BehaviorSubject< User | null>(null);
//   currentUser$ = this._currentUser$.asObservable();

//   constructor(private jwtSrv: JWTService,
//     private http: HttpClient,
//     private router: Router) {
//       if (this.jwtSrv.hasToken()) {
//         this.fetchUser();
//         }
//      }

     

//      private fetchUser() {
//       this.http.get<User>('/api/users/me')
//       .pipe(
//         catchError(_ => {
//           this.jwtSrv.removeToken();
//           return of(null);
//         })
//       )
//       }
//     }
