import { Injectable } from '@angular/core';
import { Categorie } from '../models/categorie.model';
import { HotelCategorie } from '../models/hotel-categorie.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  readonly baseURI = 'https://localhost:44315/api';
  list: Categorie[];
  dataChange: BehaviorSubject<Categorie[]> = new BehaviorSubject<Categorie[]>([]);

  constructor(private http: HttpClient) { }

  get data(): Categorie[] {
    return this.dataChange.value;
  }

  /* CRUD METHODS */
  getAllCategories(): void {
    this.http.get<Categorie[]>(`${this.baseURI}/Categorie/GetCategories`).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  async getCategorieById(categorieId)
  {
    return await this.http.get<Categorie>(this.baseURI + '/Categorie/' + categorieId).toPromise();
  }

  // GET: api/Categorie/GetHotelCategory/1
  async GetHotelCategory(hotelId) {
    return await this.http.get<HotelCategorie[]>(this.baseURI + '/Categorie/GetHotelCategory/' + hotelId).toPromise();
  }
}
