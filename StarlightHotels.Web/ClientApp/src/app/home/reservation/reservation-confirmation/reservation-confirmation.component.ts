import { Component, OnInit } from '@angular/core';
import { Payment } from '../../../models/payment.model';

@Component({
  selector: 'app-reservation-confirmation',
  templateUrl: './reservation-confirmation.component.html',
  styleUrls: ['./reservation-confirmation.component.css']
})
export class ReservationConfirmationComponent implements OnInit {

  payment: Payment = {} as Payment;

  constructor() { }

  ngOnInit(): void {

    // TODO: Get reservation deatils from DB

    // TODO: get payment system info


    // set payment data
    // this.payment
  }

}
