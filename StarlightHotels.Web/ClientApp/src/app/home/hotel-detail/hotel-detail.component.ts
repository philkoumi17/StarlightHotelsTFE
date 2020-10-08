import { Component, OnInit, Inject } from '@angular/core';
import { Pays } from 'src/app/models/pays.model';
import { HotelDetail } from 'src/app/models/hotel-detail.model';
import { HotelService } from 'src/app/services/hotel.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styles: [
  ]
})

export class HotelDetailComponent implements OnInit {
  hotelDetails: HotelDetail;
  allCountries: Pays[];
  edit: boolean;

  constructor(private service: HotelService, private dialogRef: MatDialogRef<HotelDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any)
  {
    // this.id = data.Id;
  }

  ngOnInit(): void {
    this.service.detailsHotel(this.data.id).then(result => {
      this.hotelDetails = result;
    });
    this.service.getCountries().subscribe(
      (data) => {
        this.allCountries = data;
      }
    );
  }

  editHotel()
  {
    this.edit = true;
  }

  close()
  {
    this.dialogRef.close();
  }
}
