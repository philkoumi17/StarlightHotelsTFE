import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Saison } from '../models/saison.model';

@Injectable({
  providedIn: 'root'
})
export class SaisonService {
  readonly baseURI = 'https://localhost:44315/api';
  list: Saison[];
  dataChange: BehaviorSubject<Saison[]> = new BehaviorSubject<Saison[]>([]);

  constructor(private http: HttpClient) { }

  get data(): Saison[] {
    return this.dataChange.value;
  }

  /* CRUD METHODS */
  getAllSaisons(): void {
    this.http.get<Saison[]>(`${this.baseURI}/Saison/GetSaisons`).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  async getSaisonById(saisonId)
  {
    return await this.http.get<Saison>(this.baseURI + '/Saison/' + saisonId).toPromise();
  }
}