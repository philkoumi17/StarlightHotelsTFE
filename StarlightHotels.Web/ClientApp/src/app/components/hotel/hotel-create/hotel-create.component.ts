import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from 'src/app/models/hotel.model';
import { FormBuilder } from '@angular/forms';
import { HotelService } from 'src/app/services/hotel.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hotel-create',
  templateUrl: './hotel-create.component.html',
  styles: [
  ]
})
export class HotelCreateComponent implements OnInit {
  dataSaved = false;  
  hotelForm: any;  
  allHotels: Observable<Hotel[]>;  
  hotelIdUpdate = null;  
  message = null;

  constructor(private formbulider: FormBuilder, public hotelService : HotelService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  LoadData()
  {  
    this.allHotels = this.hotelService.getHotels();
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