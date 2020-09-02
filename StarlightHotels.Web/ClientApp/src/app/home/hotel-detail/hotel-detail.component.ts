import { Component, OnInit, Inject } from '@angular/core';
import { Pays } from 'src/app/models/pays.model';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styles: [
  ]
})

export class HotelDetailComponent implements OnInit {
  hotel: Hotel;
  edit: boolean;

  constructor(private service: HotelService, private dialogRef: MatDialogRef<HotelDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any)
  {
    // this.id = data.Id;
  }

  ngOnInit(): void {
    this.service.getHotelById(this.data.id).then(result => {
      // tslint:disable-next-line: triple-equals
      this.hotel = result;
    });
  }

  editHotel()
  {
    this.edit = true;
  }

  // tslint:disable-next-line: typedef
  close()
  {
    this.dialogRef.close();
  }
}
