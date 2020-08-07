import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Pays } from 'src/app/models/pays.model';
import { HotelService } from 'src/app/services/hotel.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
  title = 'StarlightHotels';
  constructor(private router: Router, private service: HotelService, private userService: UserService) { }

  ngOnInit(): void {
    this.service.getCountries().subscribe(
      (data) => {
        this.allCountries = data;
      }
    );
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
  onSearch()
  {

  }
}
