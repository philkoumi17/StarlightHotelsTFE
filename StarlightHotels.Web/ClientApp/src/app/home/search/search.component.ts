import { Component, OnInit, Input } from '@angular/core';
import { NgbDateParserFormatter, NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HotelService } from '../../services/hotel.service';
import { Pays } from '../../models/pays.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SearchHotelModel } from '../../models/search-hotel.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: []
})
/** search component*/
export class SearchComponent implements OnInit {

  @Input() searchInstance: SearchHotelModel;
  @Input() isRoomSelection: boolean;

  searchForm: FormGroup;

  minDate: Date;
  allCountries: Pays[];
  allCities: string[] = [];


  title = 'StarlightHotels';
  error: boolean;
  errorMessage: string;

  constructor(
    private router: Router,
    private service: HotelService,
    private toastr: ToastrService,
    public formatter: NgbDateParserFormatter,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) {
    this.searchForm = this.createSearchForm();
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.service.getCountries().subscribe(
      (data) => {
        this.allCountries = data;
      }
    );

    if(this.searchInstance)
    {
      if(this.searchInstance.paysId)
      {
        this.getCities(this.searchInstance.paysId).then(
          (data) => {
            this.setSearchForm();
          });
      }
    }
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

  setSearchForm() {
    this.searchForm.patchValue({
      paysId: this.searchInstance.paysId,
      city: this.searchInstance.city,
      arrivalDate: this.searchInstance.arrivalDate,
      departureDate: this.searchInstance.departureDate,
      totalAdult: this.searchInstance.totalAdult,
      totalChildren: this.searchInstance.totalChildren
    });
  }

  getCities(paysId: number) {
    return this.service.getCitiesByCountry(paysId).then(
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

    await this.service.searchHotels(searchHotelModel).then(
      (data) => {
        this.service.setHotel(data);
        this.router.navigateByUrl('home/hotel-search');
      }).catch(() => {
        this.snackBar.open("La date de départ ne peut pas être inférieur à la date d'arrivée !", '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'snackbar-danger',
        });
      });
  }
}
