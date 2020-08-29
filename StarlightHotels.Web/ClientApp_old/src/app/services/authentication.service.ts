import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  getToken()
  {
    return localStorage.getItem('token');
  }

  setToken(token: string)
  {
    localStorage.setItem('token', token);
  }

  isAuthenticated()
  {
    var token = localStorage.getItem('token');
    // console.log(jwt_decode(token));
    if(token)
    {
      return true;
    }
    return false;
  }
}