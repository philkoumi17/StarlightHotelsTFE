import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.sass']
})
export class AddHotelComponent {
  hotelForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.hotelForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      city: [''],
      arriveDate: ['', [Validators.required]],
      departDate: ['', [Validators.required]],
      totalPerson: ['', [Validators.required]],
      roomType: ['', [Validators.required]],
      address: [''],
      uploadImg: [''],
      note: ['']
    });
  }
  onSubmit() {
    console.log('Form Value', this.hotelForm.value);
  }
}
