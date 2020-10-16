import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tarif } from '../models/tarif.model';
import { HotelCategorie } from '../models/hotel-categorie.model';

@Injectable({
  providedIn: 'root'
})
export class TarifService {
  readonly baseURI = 'https://localhost:44315/api';
  list: Tarif[];
  dataChange: BehaviorSubject<Tarif[]> = new BehaviorSubject<Tarif[]>([]);

  constructor(private http: HttpClient) { }

  get data(): Tarif[] {
    return this.dataChange.value;
  }

  /* CRUD METHODS */
  getAllTarifs(): void {
    this.http.get<Tarif[]>(`${this.baseURI}/Tarif/GetTarifs`).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  async getTarifById(tarifId)
  {
    return await this.http.get<Tarif>(this.baseURI + '/Tarif/' + tarifId).toPromise();
  }

  // GET: api/Tarif/GetTarifCategorie/1
  async getTarifCategorieById(hotelCatList: HotelCategorie[]) {

    return await this.http.post<Tarif[]>(this.baseURI + '/Tarif/GetTarifCategorie/', hotelCatList).toPromise();
  }
}
