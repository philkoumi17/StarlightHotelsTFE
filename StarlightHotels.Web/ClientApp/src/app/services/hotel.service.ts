import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Hotel } from '../models/hotel.model';
import { Observable } from 'rxjs';
import { Pays } from '../models/pays.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService
{
  readonly baseURI = "https://localhost:44315/api";
  constructor(private http: HttpClient, private fb: FormBuilder) { }

  formModel = this.fb.group({
    nom: ['', [Validators.required]],
    nbEtoiles: ['', [Validators.required]],
    nbChambres: ['', [Validators.required]],
    description: ['', [Validators.required]],
    adresse: ['', [Validators.required]],
    codePostal: ['', [Validators.required]],
    ville: ['', [Validators.required]],
    pays: ['', [Validators.required]],
    telephone: ['', [Validators.required]],
    enPromotion: ['', [Validators.required]],
    topDestination: ['', [Validators.required]],
    actif: ['', [Validators.required]],
    coefficient: ['', [Validators.required]],
    checkIn: ['', [Validators.required]],
    checkOut: ['', [Validators.required]],
  });

  getHotels(): Observable<Hotel[]>
  {  
    return this.http.get<Hotel[]>(`${this.baseURI}/Hotel/GetHotels`);  
  }

  getCountries(): Observable<Pays[]>
  {  
    return this.http.get<Pays[]>(`${this.baseURI}/Hotel/GetCountries`);  
  }

  getHotelById(hotelId: number): Observable<Hotel>
  {  
    return this.http.get<Hotel>(this.baseURI + '/Hotel/id=' + hotelId);  
  }  

  insertHotel()
  {
    var body = {
      nom: this.formModel.value.nom,
      nbEtoiles: this.formModel.value.nbEtoiles,
      nbChambres: this.formModel.value.nbChambres,
      description: this.formModel.value.description,
      adresse: this.formModel.value.adresse,
      codePostal: this.formModel.value.codePostal,
      ville: this.formModel.value.ville,
      pays: this.formModel.value.pays,
      telephone: this.formModel.value.telephone,
      enPromotion: this.formModel.value.enPromotion,
      topDestination: this.formModel.value.topDestination,
      actif: this.formModel.value.actif,
      coefficient: this.formModel.value.coefficient,
      checkIn: this.formModel.value.checkIn,
      checkOut: this.formModel.value.checkOut,
    };
    return this.http.post(this.baseURI + '/Hotel', body);  
  }  

  updateHotel(hotelId: number, hotel: Hotel): Observable<Hotel>
  {
    return this.http.put<Hotel>(this.baseURI + '/Hotel/id=' + hotelId, hotel);  
  }  

  deleteHotel(hotelId: number): Observable<number>
  {  
    return this.http.delete<number>(this.baseURI + '/Hotel/id=' + hotelId);  
  }
}