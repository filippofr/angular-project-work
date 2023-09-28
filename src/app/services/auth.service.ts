import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, map, tap } from "rxjs"
import { JwtService as JWTService } from "./jwt.service";
import { User } from "../interfaces/user";
import { SignUpClass } from "../pages/registration/registration.component";


@Injectable({providedIn: 'root'})
export class AuthService {
  private _currentUser$ = new BehaviorSubject<User | null>(null);

  currentUser$ = this._currentUser$.asObservable();

  constructor(private jwtSrv: JWTService,
              private http: HttpClient,
              private router: Router) {
    this.fetchUser();
  }

  isLoggedIn() {
    return this.jwtSrv.hasToken();
  }

  login(username: string, password: string) {
    this.http.post<{user: User, id: string}>('/api/account', {username, password}).pipe(
      tap(res => this.jwtSrv.setBankId(res.id)),
      tap(res => this._currentUser$.next(res.user)),
      map(res => res.user)
    );
    return this.http.post<{user: User, token: string}>('/api/login', {username, password})
      .pipe(
        tap(res => this.jwtSrv.setToken(res.token)),
        tap(res => this._currentUser$.next(res.user)),
        map(res => res.user)
      );
  }

  signUp(data: SignUpClass) {
    return this.http.post<User>('/api/register', {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      password: data.password
    });
}

  logout() {
    this.jwtSrv.removeToken();
    this.jwtSrv.removeBankId();
    this._currentUser$.next(null);
    this.router.navigate(['/login']);
  }

  private fetchUser() {
    this.http.get<User>('https://projectworkits.azurewebsites.net/api/users/me')
      .subscribe(user => this._currentUser$.next(user));
  }
}
