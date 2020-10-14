import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  readonly baseURI = 'https://localhost:44315/api';
  list: Service[];
  dataChange: BehaviorSubject<Service[]> = new BehaviorSubject<Service[]>([]);

  constructor(private http: HttpClient) { }

  get data(): Service[] {
    return this.dataChange.value;
  }

  /* CRUD METHODS */
  getAllServices(): void {
    this.http.get<Service[]>(`${this.baseURI}/Service/GetServices`).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  async getServiceById(servId)
  {
    return await this.http.get<Service>(this.baseURI + '/Service/' + servId).toPromise();
  }
}
