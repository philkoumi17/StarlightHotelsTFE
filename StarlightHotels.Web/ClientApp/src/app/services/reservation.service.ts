import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Formule } from '../models/formule.model';
import { Reservation } from '../models/reservation.model';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  readonly baseURI = 'https://localhost:44315/api';
  list: Reservation[];
  dataChange: BehaviorSubject<Reservation[]> = new BehaviorSubject<Reservation[]>([]);

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  /* FormModel */
  formModel = this.fb.group({
    utilisateurId: [0, [Validators.required]],
    dateReservation: ['', Validators.required],
    montant: [0, [Validators.required]],
    etatId: [0, [Validators.required]]
  });

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

  getFormules(): Observable<Formule[]>
  {
    return this.http.get<Formule[]>(`${this.baseURI}/Reservation/GetFormules`);
  }

  getServices(): Observable<Service[]>
  {
    return this.http.get<Service[]>(`${this.baseURI}/Reservation/GetServices`);
  }

  async insertBooking(body: Reservation)
  {
    return await this.http.post<Reservation>(this.baseURI + '/Reservation', body).toPromise();
  }
}
