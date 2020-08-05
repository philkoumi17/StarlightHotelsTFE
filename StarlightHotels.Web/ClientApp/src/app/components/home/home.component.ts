import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Pays } from 'src/app/models/pays.model';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    './home.component.css'
  ]
})
export class HomeComponent implements OnInit {
  allCountries: Pays[];
  allCities: string[];
  title = 'StarlightHotels';
  constructor(private router: Router, private service: HotelService, private userService: UserService) { }

  ngOnInit(): void {
    this.service.getCountries().subscribe(
      (data) => {
        this.allCountries = data;
      }
    );
  }

  getCities(paysId: number)
  {
    console.log(paysId);
    this.service.getCitiesByCountry(paysId).then(
      (data) => {
        this.allCities = data;
      }
    );
  }
}
