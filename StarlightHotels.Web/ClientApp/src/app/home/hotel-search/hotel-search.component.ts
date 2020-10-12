import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotelDetail } from 'src/app/models/hotel-detail.model';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';
import { SearchHotelModel } from '../../models/search-hotel.model';
import { HotelDetailComponent } from '../hotel-detail/hotel-detail.component';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.css']
})
export class HotelSearchComponent implements OnInit {
  hotellist: Hotel[];
  idHotel: number;
  searchInstance: SearchHotelModel = {} as SearchHotelModel;

  // hotel: Hotel = {
  //   nom: '',
  //   telephone: '',
  //   ville: ''
  // };

  constructor(public dialog: MatDialog, private router: Router, private hotelService: HotelService) { }

  ngOnInit(): void
  {
    this.hotelService.hotelData.subscribe(data => this.hotellist = data);
    this.hotelService.searchData.subscribe(data => this.searchInstance = data);
  }

  // openUserDialog(): void
  // {
  //   const dialogRef = this.dialog.open(HotelDetailComponent, {
  //     disableClose: false,
  //     width: '50%',
  //     height: '80%',
  //     data: { data: null }
  //   });

  //   dialogRef.afterClosed().subscribe(async () => {
  //     await this.hotelService.detailsHotel(this.idHotel).then(
  //       (data) => {
  //         this.hotelService.setHotel(data);
  //         this.hotel = data;
  //       }
  //     );
  //   });
  // }
}
