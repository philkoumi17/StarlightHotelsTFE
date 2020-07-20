import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Hotel } from '../models/hotel.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService
{
  constructor(private http: HttpClient) { }
  readonly baseURI = "https://localhost:44315/api";

  getHotels(): Observable<Hotel[]>
  {  
    return this.http.get<Hotel[]>(`${this.baseURI}GetHotels`);  
  }
}