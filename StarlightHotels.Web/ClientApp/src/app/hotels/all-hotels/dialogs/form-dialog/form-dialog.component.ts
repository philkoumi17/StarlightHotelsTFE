import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HotelService } from '../../../../services/hotel.service';
import {
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Hotel } from '../../../../models/hotel.model';
import { Pays } from '../../../../models/pays.model';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  hotel: Hotel;
  allCountries: Pays[];
  allCities: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public hotelService: HotelService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.hotel.nom;
      this.hotel = data.hotel;
    } else {
      this.dialogTitle = 'New Hotel';
      this.hotel = {} as Hotel;
    }
    this.hotelService.formModel = this.createContactForm();
  }

  ngOnInit(): void {
    this.hotelService.getCountries().subscribe(
      (data) => {
        this.allCountries = data;
      }
    );

    if (this.hotel && this.hotel.paysId) {
      this.getCities(this.hotel.paysId);
    }
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.hotel.id],
      nom: [this.hotel.nom, [Validators.required]],
      nbEtoiles: [this.hotel.nbEtoiles, [Validators.required]],
      nbChambres: [this.hotel.nbChambres, [Validators.required]],
      description: [this.hotel.description],
      adresse: [this.hotel.adresse, [Validators.required]],
      codePostal: [this.hotel.codePostal],
      ville: [this.hotel.ville, [Validators.required]],
      paysId: [this.hotel.paysId, [Validators.required]],
      telephone: [this.hotel.telephone, [Validators.required]],
      enPromotion: [this.hotel.enPromotion, [Validators.required]],
      topDestination: [this.hotel.topDestination, [Validators.required]],
      actif: [this.hotel.actif, [Validators.required]],
      coefficient: [this.hotel.coefficient, [Validators.required]],
      checkIn: [this.hotel.checkIn, [Validators.required]],
      checkOut: [this.hotel.checkOut, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public Save(): void {
    if (this.hotelService.formModel.value && this.hotelService.formModel.value.id) {
      this.hotelService.updateHotel(this.hotelService.formModel.value);
    } else {
      this.hotelService.insertHotel();
    }   
  }

  getCities(paysId: number) {
    return this.hotelService.getCitiesByCountry(paysId).then(
      (data) => {
        this.allCities = data;
      }
    );
  }
}
