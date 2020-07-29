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
  hotelForm: any;  
  allHotels: Observable<Hotel[]>;
  allCountries: Pays[];
  selectedCountry: Pays;
  minEndDate = new Date();
  minStartDate = new Date();

  constructor(private formbulider: FormBuilder, public hotelService : HotelService, private toastr: ToastrService, private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.LoadData();
  }

  async LoadData()
  {  
    this.allHotels = this.hotelService.getHotels();
    this.hotelService.getCountries().subscribe(
      (data) => {
        this.allCountries = data;
        console.log(this.allCountries);
      }
    )
  }

  createHotel()
  {  
    this.hotelService.insertHotel().subscribe(  
      () => {  
        this.toastr.success('New hotel saved with success', 'Insertion with success !');
      }  
    );
    this.dialogRef.close("ok");
  }

  updateHotel(hotel: Hotel)
  {  
    if(hotel.id != null)
    {  
      this.hotelService.updateHotel(hotel.id, hotel).subscribe(() => {  
        this.toastr.success('This hotel is updated with success', 'Update successful !');
      });  
    }  
  }

  onFormSubmit()
  {  
    this.createHotel(); 
  }
}