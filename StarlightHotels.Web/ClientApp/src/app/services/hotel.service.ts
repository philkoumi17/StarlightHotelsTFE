import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hotel } from '../models/hotel.model';
import { SearchHotelModel } from '../models/search-hotel.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Pays } from '../models/pays.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService
{
  readonly baseURI = 'https://localhost:44315/api';
  formData: Hotel;
  list: Hotel[];

  // For searching hotels
  hotelInstance: Hotel[];

  // Observable
  private hotelBehavior = new BehaviorSubject<Hotel[]>(this.hotelInstance);
  hotelData = this.hotelBehavior.asObservable();

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  formModel = this.fb.group({
    nom: ['', [Validators.required]],
    nbEtoiles: [0, [Validators.required]],
    nbChambres: [0, [Validators.required]],
    description: ['', [Validators.required]],
    adresse: ['', [Validators.required]],
    codePostal: ['', [Validators.required]],
    ville: ['', [Validators.required]],
    pays: [null, [Validators.required]],
    telephone: ['', [Validators.required]],
    enPromotion: ['Yes', [Validators.required]],
    topDestination: ['Yes', [Validators.required]],
    actif: ['Yes', [Validators.required]],
    coefficient: [0, [Validators.required]],
    checkIn: [null, [Validators.required]],
    checkOut: [null, [Validators.required]]
  });

  getHotels(): Observable<Hotel[]>
  {
    return this.http.get<Hotel[]>(`${this.baseURI}/Hotel/GetHotels`);
  }

  async getHotelsAsync()
  {
    return await this.http.get<Hotel[]>(`${this.baseURI}/Hotel/GetHotels`).toPromise();
  }

  getCountries(): Observable<Pays[]>
  {
    return this.http.get<Pays[]>(`${this.baseURI}/Hotel/GetCountries`);
  }

  async getCitiesByCountry(paysId: number)
  {
    return await this.http.get<string[]>(this.baseURI + '/Hotel/GetCitiesByCountry/' + paysId).toPromise();
  }

  async getHotelById(hotelId)
  {
    return await this.http.get<Hotel>(this.baseURI + '/Hotel/' + hotelId).toPromise();
  }

  insertHotel()
  {
    let body: Hotel = {
      nom: this.formModel.value.nom,
      nbEtoiles: this.formModel.value.nbEtoiles,
      nbChambres: this.formModel.value.nbChambres,
      description: this.formModel.value.description,
      adresse: this.formModel.value.adresse,
      codePostal: this.formModel.value.codePostal,
      ville: this.formModel.value.ville,
      paysId: this.formModel.value.pays.id,
      telephone: this.formModel.value.telephone,
      enPromotion: this.formModel.value.enPromotion === 'Yes',
      topDestination: this.formModel.value.topDestination === 'Yes',
      actif: this.formModel.value.actif === 'Yes',
      coefficient: this.formModel.value.coefficient,
      checkIn: this.formModel.value.checkIn,
      checkOut: this.formModel.value.checkOut,
    };
    console.log(this.formModel.value.enPromotion);
    console.log(body);
    return this.http.post<Hotel>(this.baseURI + '/Hotel', body);
  }

  updateHotel(): Observable<Hotel>
  {
    console.log();
    return this.http.put<Hotel>(this.baseURI + '/Hotel/' + this.formData.id, this.formData);
  }

  // update hotel
  // tslint:disable-next-line: typedef
  setHotel(hotel)
  {
    this.hotelBehavior.next(hotel);
  }

  deleteHotel(hotelId: number): Observable<number>
  {
    return this.http.delete<number>(this.baseURI + '/Hotel/id=' + hotelId);
  }

  refreshList()
  {
    this.http.get(this.baseURI + '/Hotel')
    .toPromise()
    .then(res => this.list = res as Hotel[]);
  }

  /**
   * Search for hotels
   * @param searchHotelModel
   */
  async searchHotels(searchHotelModel: SearchHotelModel)
  {
    return await this.http.post<Hotel[]>(this.baseURI + '/Hotel/SearchHotels', searchHotelModel).toPromise();
  }
}
