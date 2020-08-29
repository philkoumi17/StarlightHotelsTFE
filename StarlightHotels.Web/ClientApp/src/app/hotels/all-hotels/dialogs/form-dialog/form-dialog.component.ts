import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HotelService } from '../../hotel.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Hotel } from '../../hotel.model';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  hotelForm: FormGroup;
  hotel: Hotel;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public hotelService: HotelService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.hotel.name;
      this.hotel = data.hotel;
    } else {
      this.dialogTitle = 'New Hotel';
      this.hotel = new Hotel({});
    }
    this.hotelForm = this.createContactForm();
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.hotel.id],
      img: [this.hotel.img],
      name: [this.hotel.name],
      email: [
        this.hotel.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      arriveDate: [
        formatDate(this.hotel.arriveDate, 'yyyy-MM-dd', 'en'),
        [Validators.required]
      ],
      departDate: [
        formatDate(this.hotel.departDate, 'yyyy-MM-dd', 'en'),
        [Validators.required]
      ],
      gender: [this.hotel.gender],
      mobile: [this.hotel.mobile],
      roomType: [this.hotel.roomType],
      payment: [this.hotel.payment]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.hotelService.addHotel(this.hotelForm.getRawValue());
  }
}
