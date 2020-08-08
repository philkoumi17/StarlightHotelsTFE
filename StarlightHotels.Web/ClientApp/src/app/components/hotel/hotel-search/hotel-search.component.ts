import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.css']
})
export class HotelSearchComponent implements OnInit {
  hotel: Hotel;

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void
  {
    this.hotelService.hotelData.subscribe(data => this.hotel = data);
  }

}
