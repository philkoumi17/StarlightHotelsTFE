import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  title = 'StarlightHotels';
  hotelImage: any[];

  constructor() {
  }

  // getHotelImage(hotelId: number){
  //   this.hotelService.getPictures(hotelId).subscribe(res => {
  //     console.log(res);
  //     return res;
  //   });
  // }

  // mapImage(id:number){
  //  let data= this.hotelImage.filter(element => {
  //       if(element.id==id){
  //         return element;
  //       }
  //   });

  //   return data;
  // }
}
