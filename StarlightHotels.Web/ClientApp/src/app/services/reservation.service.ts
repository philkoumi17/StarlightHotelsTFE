import { Injectable } from '@angular/core';
import { ParticipantModel } from '../models/participant.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {


  constructor() { }

  participantInstance: ParticipantModel[] = [];

  private participantBehavior = new BehaviorSubject<any>(this.participantInstance);
  participantData = this.participantBehavior.asObservable();


  updateParticipantData(participant: ParticipantModel[]) {
    this.participantBehavior.next(participant);
  }

  
}
