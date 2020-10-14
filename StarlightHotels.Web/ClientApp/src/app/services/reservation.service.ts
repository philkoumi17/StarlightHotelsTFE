import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  readonly baseURI = 'https://localhost:44315/api';
  list: Reservation[];
  dataChange: BehaviorSubject<Reservation[]> = new BehaviorSubject<Reservation[]>([]);

  constructor(private http: HttpClient) { }

  get data(): Reservation[] {
    return this.dataChange.value;
  }

  /* CRUD METHODS */
  getAllReservations(): void {
    this.http.get<Reservation[]>(`${this.baseURI}/Reservation/GetReservations`).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  async getReservationById(resId)
  {
    return await this.http.get<Reservation>(this.baseURI + '/Reservation/' + resId).toPromise();
  }
}
