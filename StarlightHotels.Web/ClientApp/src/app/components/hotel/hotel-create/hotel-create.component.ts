import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from 'src/app/models/hotel.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HotelService } from 'src/app/services/hotel.service';
import { ToastrService } from 'ngx-toastr';
import { Pays } from 'src/app/models/pays.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-hotel-create',
  templateUrl: './hotel-create.component.html',
  styles: [
    './hotel-create.component.css'
  ]
})
export class HotelCreateComponent implements OnInit {
  options: FormGroup;
  dataSaved = false;  
  hotelForm: any;  
  allHotels: Observable<Hotel[]>;
  allCountries: Pays[];
  selectedCountry: Pays;
  hotelIdUpdate = null;  
  message = null;

  constructor(private formbulider: FormBuilder, public hotelService : HotelService, private toastr: ToastrService, private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.LoadData();
  }

  LoadData()
  {  
    this.allHotels = this.hotelService.getHotels();
    this.hotelService.getCountries().subscribe(
      (data) => {
        this.allCountries = data;
        console.log(this.allCountries);
      }
    )
  }

  CreateHotel(hotel: Hotel)
  {  
    if(this.hotelIdUpdate == null)
    {  
      this.hotelService.insertHotel().subscribe(  
        () => {  
          this.dataSaved = true;  
          this.toastr.success('New hotel saved with success', 'Insertion with success !');
          this.LoadData();  
          this.hotelIdUpdate = null;  
          this.hotelForm.reset();  
        }  
      );  
    }
    else
    {  
      hotel.id = this.hotelIdUpdate;  
      this.hotelService.updateHotel(hotel.id, hotel).subscribe(() => {  
        this.dataSaved = true;  
        this.toastr.success('This hotel is updated with success', 'Update successful !');  
        this.LoadData();  
        this.hotelIdUpdate = null;  
        this.hotelForm.reset();  
      });  
    }  
  }

  onFormSubmit()
  {  
    this.dataSaved = false;  
    const hotel = this.hotelForm.value;  
    this.CreateHotel(hotel);  
    this.hotelForm.reset();  
  }

  resetForm()
  {  
    this.hotelForm.reset();  
    this.message = null;  
    this.dataSaved = false;  
  }
}