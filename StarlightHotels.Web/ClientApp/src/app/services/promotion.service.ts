import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Promotion } from '../models/promotion.model';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  readonly baseURI = 'https://localhost:44315/api';
  list: Promotion[];
  dataChange: BehaviorSubject<Promotion[]> = new BehaviorSubject<Promotion[]>([]);

  constructor(private http: HttpClient) { }

  get data(): Promotion[] {
    return this.dataChange.value;
  }

  /* CRUD METHODS */
  getAllPromotions(): void {
    this.http.get<Promotion[]>(`${this.baseURI}/Promotion/GetPromotions`).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  async getPromotionById(partId)
  {
    return await this.http.get<Promotion>(this.baseURI + '/Promotion/' + partId).toPromise();
  }
}