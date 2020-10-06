import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Utilisateur } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser: Utilisateur;

  // Observable
  private currentUserBehavior = new BehaviorSubject<Utilisateur>(this.currentUser);
  currentUserData = this.currentUserBehavior.asObservable();

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

  setUser(user: Utilisateur) {
    this.currentUserBehavior.next(user);
  }
}
