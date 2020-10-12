import { Component } from '@angular/core';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  title = 'StarlightHotels';
  hotelsList = [];
  hotelsTopList = [];
  hotelImage: any[];

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

  getHotelImage(hotelId: number){
    this.hotelService.getPictures(hotelId).subscribe(res => {
      console.log(res);
      return res;
    });
  }

  // mapImage(id:number){
  //  let data= this.hotelImage.filter(element => {
  //       if(element.id==id){
  //         return element;
  //       }
  //   });

  //   return data;
  // }
}
