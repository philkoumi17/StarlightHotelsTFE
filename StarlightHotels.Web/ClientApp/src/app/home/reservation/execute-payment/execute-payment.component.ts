import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-execute-payment',
  templateUrl: './execute-payment.component.html',
  styleUrls: ['./execute-payment.component.css']
})
export class ExecutePaymentComponent implements OnInit {

  @ViewChild('form') form: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  submitForm() {
    this.form.nativeElement.submit();
  }

}
