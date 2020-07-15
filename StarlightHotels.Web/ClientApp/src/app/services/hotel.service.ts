import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }
  readonly baseURI = "https://localhost:44315/api";

  addHotel(formData:Hotel)
  {
    return this.http.post(this.baseURI + "/Hotel", formData);
  }
}