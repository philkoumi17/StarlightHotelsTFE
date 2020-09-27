import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { HotelService } from '../../services/hotel.service';
import { Pays } from '../../models/pays.model';
@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.sass']
})
export class AddHotelComponent {

  allCountries: Pays[];
  allCities: string[] = [];

  constructor(public hotelService: HotelService) {
  }

  ngOnInit(): void {
    this.hotelService.getCountries().subscribe(
      (data) => {
        this.allCountries = data;
      }
    );
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
