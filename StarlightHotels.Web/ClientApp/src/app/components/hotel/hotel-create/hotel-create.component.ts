import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from 'src/app/models/hotel.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HotelService } from 'src/app/services/hotel.service';
import { ToastrService } from 'ngx-toastr';
import { Pays } from 'src/app/models/pays.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-hotel-create',
  templateUrl: './hotel-create.component.html',
  styles: [
    './hotel-create.component.css'
  ]
})
export class HotelCreateComponent implements OnInit {
  hotel: Hotel;
  options: FormGroup;
  hotelForm: any;
  allHotels: Observable<Hotel[]>;
  allCountries: Pays[];
  selectedCountry: Pays;
  minEndDate = new Date();
  minStartDate = new Date();

  // tslint:disable-next-line: max-line-length
  constructor(private formbulider: FormBuilder, public hotelService: HotelService, private toastr: ToastrService,
              private dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    if (this.data.id){
      this.hotelService.getHotelById(this.data.id).then(result => {
        // tslint:disable-next-line: triple-equals
        this.hotel = result;
        this.editHotel(this.hotel);
      });
    }

    this.LoadData();
  }

  // tslint:disable-next-line: typedef
  async LoadData()
  {
    // this.allHotels = this.hotelService.getHotels();
    this.hotelService.getCountries().subscribe(
      (data) => {
        this.allCountries = data;
      }
    );
  }


  editHotel(hotel: Hotel)
  {
    //this.hotelService.formModel.value.nom.setValue(hotel.nom);
    //this.hotelForm.controls['id'].setValue(hotel.id);
    // this.hotelForm.controls['nom'].setValue(hotel.nom);
    // this.hotelForm.controls['nbEtoiles'].setValue(hotel.nbEtoiles);
    // this.hotelForm.controls['nbChambres'].setValue(hotel.nbChambres);
    // this.hotelForm.controls['description'].setValue(hotel.description);
    // this.hotelForm.controls['adresse'].setValue(hotel.adresse);
    // this.hotelForm.controls['codePostal'].setValue(hotel.codePostal);
    // this.hotelForm.controls['ville'].setValue(hotel.ville);
    // this.hotelForm.controls['pays'].setValue(hotel.pays.nom);
    // this.hotelForm.controls['telephone'].setValue(hotel.telephone);
    // this.hotelForm.controls['enPromotion'].setValue(hotel.enPromotion);
    // this.hotelForm.controls['topDestination'].setValue(hotel.topDestination);
    // this.hotelForm.controls['actif'].setValue(hotel.actif);
    // this.hotelForm.controls['coefficient'].setValue(hotel.coefficient);
    // this.hotelForm.controls['checkIn'].setValue(hotel.checkIn);
    // this.hotelForm.controls['checkOut'].setValue(hotel.checkOut);
  }


  // tslint:disable-next-line: typedef
  createHotel()
  {
    this.hotelService.insertHotel().subscribe(
      () => {
        this.toastr.success('New hotel saved with success', 'Insertion with success !');
      }
    );
    this.dialogRef.close('ok');
  }

  // tslint:disable-next-line: typedef
  onFormSubmit()
  {
    this.createHotel();
  }
}
