import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Pays } from 'src/app/models/pays.model';
import { HotelService } from 'src/app/services/hotel.service';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    './home.component.css'
  ]
})
export class HomeComponent implements OnInit {
  modelArrival: NgbDateStruct;
  modelDeparture: NgbDateStruct;
  allCountries: Pays[];
  allCities: string[];
  paysId: number;
  selectedCity: string;
  minDate: NgbDateStruct;
  title = 'StarlightHotels';
  constructor(private router: Router, private service: HotelService, private userService: UserService) { }

  ngOnInit(): void {
    this.service.getCountries().subscribe(
      (data) => {
        this.allCountries = data;
      }
    );
    let today = new Date();
    this.minDate = {year: today.getFullYear(), month: today.getMonth(), day: today.getDay()};
  }

  // tslint:disable-next-line: typedef
  getCities(paysId: number)
  {
    this.paysId = paysId;
    this.service.getCitiesByCountry(paysId).then(
      (data) => {
        this.allCities = data;
      }
    );
  }

  // tslint:disable-next-line: typedef
  setCity(city: string)
  {
    this.selectedCity = city;
  }

  // tslint:disable-next-line: typedef
  async onSearch()
  {
    let dateA = new Date(this.modelArrival.year, this.modelArrival.month, this.modelArrival.day);
    let dateB = new Date(this.modelDeparture.year, this.modelDeparture.month, this.modelDeparture.day);
    // TODO for validation on dates
    if (dateA < dateB)
    {
      await this.service.searchHotels(this.paysId, this.selectedCity, dateA, dateB).then(
        (data) => {
          this.service.setHotel(data);
          this.router.navigateByUrl('/hotel-search');
      });
    }
    else
    {
      console.log('ERROR! Choose an other date before the date departure');
    }
  }
}
