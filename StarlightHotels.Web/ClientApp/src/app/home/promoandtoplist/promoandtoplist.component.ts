import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-promoandtoplist',
  templateUrl: './promoandtoplist.component.html',
  styleUrls: ['./promoandtoplist.component.sass']
})
export class PromoandtoplistComponent implements OnInit {
  hotelsList = [];
  hotelsTopList = [];

  constructor(private hotelService: HotelService) { 
    this.hotelService.getAllPromotedHotels().then(res => {
      this.hotelsList = res;
      console.log(res);
    });

    this.hotelService.getAllTopHotels().then(data => {
      this.hotelsTopList = data;
      console.log(data);
    });
  }

  ngOnInit(): void {
  }
}