import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chambre } from '../models/chambre.model';

@Injectable({
  providedIn: 'root'
})
export class ChambreService {
  readonly baseURI = 'https://localhost:44315/api';
  list: Chambre[];
  dataChange: BehaviorSubject<Chambre[]> = new BehaviorSubject<Chambre[]>([]);

  constructor(private http: HttpClient) { }

  get data(): Chambre[] {
    return this.dataChange.value;
  }

  /* CRUD METHODS */
  getAllChambres(): void {
    this.http.get<Chambre[]>(`${this.baseURI}/Chambre/GetChambres`).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  async getChambreByNum(numChambre)
  {
    return await this.http.get<Chambre>(this.baseURI + '/Chambre/' + numChambre).toPromise();
  }
}