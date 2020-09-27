import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { HotelService } from '../../services/hotel.service';
import { Pays } from '../../models/pays.model';
import { Hotel } from '../../models/hotel.model';
@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.sass']
})
export class AddHotelComponent {

  hotel: Hotel;
  allCountries: Pays[];
  allCities: string[] = [];

  constructor(public hotelService: HotelService, private fb: FormBuilder) {
    this.hotel = {} as Hotel;
    this.hotelService.formModel = this.createContactForm();
  }

  ngOnInit(): void {
    this.hotelService.getCountries().subscribe(
      (data) => {
        this.allCountries = data;
      }
    );
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

  getCities(paysId: number) {
    return this.hotelService.getCitiesByCountry(paysId).then(
      (data) => {
        this.allCities = data;
      }
    );
  }

  public Save(): void {
    if (this.hotelService.formModel.value && this.hotelService.formModel.value.id) {
      this.hotelService.updateHotel(this.hotelService.formModel.value);
    } else {
      this.hotelService.insertHotel();
    }
  }
}
