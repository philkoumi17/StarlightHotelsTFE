import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Participant } from '../models/participant.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  readonly baseURI = 'https://localhost:44315/api';
  list: Participant[];
  dataChange: BehaviorSubject<Participant[]> = new BehaviorSubject<Participant[]>([]);

  constructor(private http: HttpClient) { }

  get data(): Participant[] {
    return this.dataChange.value;
  }

  /* CRUD METHODS */
  getAllParticipants(): void {
    this.http.get<Participant[]>(`${this.baseURI}/Participant/GetParticipants`).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  async getParticipantById(partId)
  {
    return await this.http.get<Participant>(this.baseURI + '/Participant/' + partId).toPromise();
  }
}
