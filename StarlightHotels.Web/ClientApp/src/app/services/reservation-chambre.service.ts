import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ReservationChambre } from '../models/reservationChambre.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationChambreService{
  readonly baseURI = 'https://localhost:44315/api';
  // For searching bookings
  bookInstance: ReservationChambre[];
  list: ReservationChambre[];
  dataChange: BehaviorSubject<ReservationChambre[]> = new BehaviorSubject<ReservationChambre[]>([]);

  private resChBehavior = new BehaviorSubject<ReservationChambre[]>(this.bookInstance);
  hotelData = this.resChBehavior.asObservable();

  formModel = this.fb.group({
    nbAdultes: [0, [Validators.required]],
    nbEnfants: [0, [Validators.required]],
    dateArrivee: [new Date(), [Validators.required]],
    dateDepart: [new Date(), [Validators.required]],
    litSupplementaire: [false],
    montantTotal: [0, [Validators.required]],
    formuleId: [0, [Validators.required]],
    formule: [null, [Validators.required]],
    chambreId: [0, [Validators.required]],
    chambre: [null, [Validators.required]],
    reservationId: [0, [Validators.required]],
    reservation: [null, [Validators.required]],
  });

  constructor(private http: HttpClient,
              private fb: FormBuilder) { }

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

  async getChambreReserveesAsync()
  {
    return await this.http.get<ReservationChambre[]>(`${this.baseURI}/ReservationChambre/GetChambreReservees`).toPromise();
  }

  async getReservationChambreById(resChId)
  {
    return await this.http.get<ReservationChambre>(this.baseURI + '/ReservationChambre/' + resChId).toPromise();
  }
}