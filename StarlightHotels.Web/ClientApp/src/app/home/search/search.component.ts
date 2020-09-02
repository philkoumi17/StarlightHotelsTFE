import { Component, OnInit } from '@angular/core';
import { NgbDateParserFormatter, NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HotelService } from '../../services/hotel.service';
import { Pays } from '../../models/pays.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SearchHotelModel } from '../../models/search-hotel.model';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: []
})
/** search component*/
export class SearchComponent implements OnInit{

  searchForm: FormGroup;

  minDate: Date;
  allCountries: Pays[];
  allCities: string[] = [];
  paysId: number = 0;


  title = 'StarlightHotels';
  error: boolean;
  errorMessage: string;

  constructor(
    private router: Router,
    private service: HotelService,
    private toastr: ToastrService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private fb: FormBuilder) {
    this.searchForm = this.createSearchForm();
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.service.getCountries().subscribe(
      (data) => {
        this.allCountries = data;
      }
    );
  }


  createSearchForm(): FormGroup {
    return this.fb.group({
      paysId: [''],
      city: [''],
      arrivalDate: ['', [Validators.required]],
      departureDate: ['', [Validators.required]],
      totalAdult: [1, [Validators.required]],
      totalChildren: [0, [Validators.required]],
    });
  }

  getCities(paysId: number) {
    this.paysId = paysId;
    this.service.getCitiesByCountry(paysId).then(
      (data) => {
        this.allCities = data;    
      }
    );
  }

  /**
   * Action on search
   * */
  async onSearch() {

    this.error = false;
    this.errorMessage = '';

    let searchHotelModel: SearchHotelModel = this.searchForm.getRawValue();
    console.log(searchHotelModel);

    await this.service.searchHotels(searchHotelModel).then(
      (data) => {
        this.service.setHotel(data);
        this.router.navigateByUrl('home/hotel-search');
      });
  }
}
