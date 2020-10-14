import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Facture } from '../models/facture.model';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  readonly baseURI = 'https://localhost:44315/api';
  list: Facture[];
  dataChange: BehaviorSubject<Facture[]> = new BehaviorSubject<Facture[]>([]);

  constructor(private http: HttpClient) { }

  get data(): Facture[] {
    return this.dataChange.value;
  }

  /* CRUD METHODS */
  getAllFactures(): void {
    this.http.get<Facture[]>(`${this.baseURI}/Facture/GetFactures`).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  async getFactureById(factureId)
  {
    return await this.http.get<Facture>(this.baseURI + '/Facture/' + factureId).toPromise();
  }
}