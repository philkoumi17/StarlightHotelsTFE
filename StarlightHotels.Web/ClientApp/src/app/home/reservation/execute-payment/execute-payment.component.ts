import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Payment } from '../../../models/payment.model';

@Component({
  selector: 'app-execute-payment',
  templateUrl: './execute-payment.component.html',
  styleUrls: ['./execute-payment.component.css']
})
export class ExecutePaymentComponent implements OnInit {

  @ViewChild('form') form: ElementRef;

  @Input() payment: Payment = {} as Payment;

  constructor() { }

  ngOnInit(): void {
  }

  submitForm() {
    this.form.nativeElement.submit();
  }

}
