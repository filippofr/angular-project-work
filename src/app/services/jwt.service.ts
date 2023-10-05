import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  hasToken() {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  removeToken() {
    localStorage.removeItem('authToken');
  }

  hasBankId() {
    return !!this.getBankId();
  }

  getBankId() {
    return localStorage.getItem('bankId');
  }

  setBankId(bankId: string) {
    localStorage.setItem('bankId', bankId);
  }

  removeBankId() {
    localStorage.removeItem('bankId');
  }
}
