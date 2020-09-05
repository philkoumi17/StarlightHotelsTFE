import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/models/hotel.model';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  hotel: Hotel;
  hotelId: number;
  constructor(private route: ActivatedRoute, private service: HotelService) { }

  ngOnInit(): void {
    // This is how to get the param id for the hotel's choice from the url
    this.route.params.subscribe(params => {
      this.hotelId = params['id'];
    });

    // To get the hotel's information
    this.service.getHotelById(this.hotelId).then(result => {
      this.hotel = result;
    });
  }

}
