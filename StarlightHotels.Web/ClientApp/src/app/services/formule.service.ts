import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Formule } from '../models/formule.model';

@Injectable({
  providedIn: 'root'
})
export class FormuleService {
  readonly baseURI = 'https://localhost:44315/api';
  list: Formule[];
  dataChange: BehaviorSubject<Formule[]> = new BehaviorSubject<Formule[]>([]);

  constructor(private http: HttpClient) { }

  get data(): Formule[] {
    return this.dataChange.value;
  }

  /* CRUD METHODS */
  getAllFormules(): void {
    this.http.get<Formule[]>(`${this.baseURI}/Formule/GetFormules`).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  async getFormuleById(formuleId)
  {
    return await this.http.get<Formule>(this.baseURI + '/Formule/' + formuleId).toPromise();
  }
}