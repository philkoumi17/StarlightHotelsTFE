import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.css']
})
export class ReservationCreateComponent implements OnInit {
  modelArrival: NgbDateStruct;
  modelDeparture: NgbDateStruct;
  minDate: NgbDateStruct;
  nb = [2];

  constructor() { }

  ngOnInit(): void {
    let today = new Date();
    this.minDate = {year: today.getFullYear(), month: today.getMonth(), day: today.getDay()};
  }

  getNbPart(id: number) {
    // this.nb = id;
  }
}
