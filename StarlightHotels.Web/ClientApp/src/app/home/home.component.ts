import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { HotelService } from '../services/hotel.service';
import { Pays } from '../models/pays.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  fromDate: NgbDate;
  modelArrival: NgbDate;
  modelDeparture: NgbDate;
  allCountries: Pays[];
  allCities: string[];
  paysId: number = 0;
  selectedCity: string = '';
  minDate: NgbDateStruct;
  title = 'StarlightHotels';
  error: boolean;
  errorMessage: string;

  /**
   * Constructor
   * @param router
   * @param service
   * @param calendar
   * @param formatter
   */
  constructor(
    private router: Router,
    private service: HotelService,
    private toastr: ToastrService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter) {
    // this.fromDate = calendar.getToday();
    // this.modelArrival = calendar.getToday();
  }

  ngOnInit(): void {
    this.service.getCountries().subscribe(
      (data) => {
        this.allCountries = data;
      }
    );
    // let today = new Date();
    // this.minDate = { year: today.getFullYear(), month: today.getMonth(), day: today.getDay() };
  }

  // tslint:disable-next-line: typedef
  getCities(paysId: number) {
    this.paysId = paysId;
    this.service.getCitiesByCountry(paysId).then(
      (data) => {
        this.allCities = data;
      }
    );
  }

  // tslint:disable-next-line: typedef
  setCity(city: string) {
    this.selectedCity = city;
  }

  /**
   * Action on search
   * */
  async onSearch() {

    this.error = false;
    this.errorMessage = '';

    if (!this.modelDeparture) {
      this.error = true;
      this.toastr.warning('Please select a departure date from the hotel');
      return;
    }

    let dateA = new Date(this.modelArrival.year, this.modelArrival.month, this.modelArrival.day);
    let dateB = new Date(this.modelDeparture.year, this.modelDeparture.month, this.modelDeparture.day);

    await this.service.searchHotels(this.paysId, this.selectedCity, dateA, dateB).then(
      (data) => {
        this.service.setHotel(data);
        this.router.navigateByUrl('/hotel-search');
      });
  }
}
