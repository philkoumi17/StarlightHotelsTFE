import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { PaymentModel } from '../../../models/payment.model';

@Component({
  selector: 'app-execute-payment',
  templateUrl: './execute-payment.component.html',
  styleUrls: ['./execute-payment.component.css']
})
export class ExecutePaymentComponent implements OnInit {

  @ViewChild('form') form: ElementRef;

  @Input() payment: PaymentModel = {} as PaymentModel

  constructor() { }

  ngOnInit(): void {
  }

  submitForm() {
    this.form.nativeElement.submit();
  }

}
