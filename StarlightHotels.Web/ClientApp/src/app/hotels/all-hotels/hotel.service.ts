import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Hotel } from './hotel.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class HotelService {
  private readonly API_URL = 'assets/data/booking.json';
  dataChange: BehaviorSubject<Hotel[]> = new BehaviorSubject<Hotel[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) { }
  get data(): Hotel[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllHotels(): void {
    this.httpClient.get<Hotel[]>(this.API_URL).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  // DEMO ONLY, you can find working methods below
  addHotel(hotel: Hotel): void {
    this.dialogData = hotel;
  }
  updateHotel(hotel: Hotel): void {
    this.dialogData = hotel;
  }
  deleteHotel(id: number): void {
    console.log(id);
  }
}
