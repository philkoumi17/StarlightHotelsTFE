import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Etat } from '../models/etat.model';

@Injectable({
  providedIn: 'root'
})
export class EtatService {
  readonly baseURI = 'https://localhost:44315/api';
  list: Etat[];
  dataChange: BehaviorSubject<Etat[]> = new BehaviorSubject<Etat[]>([]);

  constructor(private http: HttpClient) { }

  get data(): Etat[] {
    return this.dataChange.value;
  }

  /* CRUD METHODS */
  getAllEtats(): void {
    this.http.get<Etat[]>(`${this.baseURI}/Etat/GetEtats`).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  async getEtatById(etatId)
  {
    return await this.http.get<Etat>(this.baseURI + '/Etat/' + etatId).toPromise();
  }
}
