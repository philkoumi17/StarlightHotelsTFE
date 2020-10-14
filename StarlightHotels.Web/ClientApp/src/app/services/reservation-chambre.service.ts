import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReservationChambre } from '../models/reservationChambre.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationChambreService{
  readonly baseURI = 'https://localhost:44315/api';
  list: ReservationChambre[];
  dataChange: BehaviorSubject<ReservationChambre[]> = new BehaviorSubject<ReservationChambre[]>([]);

  constructor(private http: HttpClient) { }

  get data(): ReservationChambre[] {
    return this.dataChange.value;
  }

  /* CRUD METHODS */
  getAllReservationChambres(): void {
    this.http.get<ReservationChambre[]>(`${this.baseURI}/ReservationChambre/GetChambreReservees`).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  async getReservationChambreById(resChId)
  {
    return await this.http.get<ReservationChambre>(this.baseURI + '/ReservationChambre/' + resChId).toPromise();
  }
}