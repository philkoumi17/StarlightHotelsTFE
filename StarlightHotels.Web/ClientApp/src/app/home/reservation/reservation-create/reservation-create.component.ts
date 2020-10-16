import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Participant } from '../../../models/participant.model';
import { ReservationService } from '../../../services/reservation.service';
import { BehaviorSubject } from 'rxjs';
import { HotelService } from '../../../services/hotel.service';
import { SearchHotelModel } from '../../../models/search-hotel.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.css']
})
export class ReservationCreateComponent implements OnInit {
  modelArrival: NgbDateStruct;
  modelDeparture: NgbDateStruct;
  minDate: NgbDateStruct;

  hotelId;
  isRoomSelection: boolean = true;

  participantList: Participant[] = [];
  searchInstance: SearchHotelModel = {} as SearchHotelModel;

  reservationId = 1; // TODO, set reservation id after save data in db

  constructor(
    private reservationService: ReservationService,
    private hotelService: HotelService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.hotelId = params.get('id');
    });

    // TODO: Get hotel rooms
    console.log(this.hotelId);

    let today = new Date();
    this.minDate = { year: today.getFullYear(), month: today.getMonth(), day: today.getDay() };

    this.hotelService.searchData.subscribe(data => this.searchInstance = data);
    // this.reservationService.participantData.subscribe(data => this.participantList = data);
  }

  getNbPart(value: number) {

    if (this.participantList.length > value) {
      this.participantList.splice(-1, 1);
    } else if (this.participantList.length < value) {

      // tslint:disable-next-line: variable-name
      for (let _i = this.participantList.length; _i < value; _i++) {
        let participant: Participant = {} as Participant;
        this.participantList.push(participant);
      }
    }
    return;
  }
}
