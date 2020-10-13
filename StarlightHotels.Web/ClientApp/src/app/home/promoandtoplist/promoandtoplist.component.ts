import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from '../../models/hotel.model';

@Component({
  selector: 'app-promoandtoplist',
  templateUrl: './promoandtoplist.component.html',
  styleUrls: ['./promoandtoplist.component.sass']
})
export class PromoandtoplistComponent implements OnInit {
  hotelsList : Hotel[] = [];
  hotelsTopList = [];

  constructor(private hotelService: HotelService) {
    this.hotelService.getAllPromotedHotels().then(res => {
      this.hotelsList = res;

      this.hotelsList.forEach(h => {
        this.hotelService.getPictures(h.id).then((img) => {
          h.images = img;
          console.log(img);
        });
        h.stars = [];
        for (var _i = 0; _i < h.nbEtoiles; _i++) {
          h.stars.push(_i);
        }
      })

      console.log('this is my hotels list', res);
    });

    this.hotelService.getAllTopHotels().then(data => {
      this.hotelsTopList = data;
    });
  }

  ngOnInit(): void {
  }

}
