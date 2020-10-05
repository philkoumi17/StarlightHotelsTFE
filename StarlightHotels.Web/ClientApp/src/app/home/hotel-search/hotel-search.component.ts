import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';
import { SearchHotelModel } from '../../models/search-hotel.model';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.css']
})
export class HotelSearchComponent implements OnInit {
  hotellist: Hotel[];
  searchInstance: SearchHotelModel = {} as SearchHotelModel;

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void
  {
    this.hotelService.hotelData.subscribe(data => this.hotellist = data);
    this.hotelService.searchData.subscribe(data => this.searchInstance = data);
  }
}
