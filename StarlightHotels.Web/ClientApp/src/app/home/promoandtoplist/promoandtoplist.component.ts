import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { TarifService } from '../../services/tarif.service';
import { Hotel } from '../../models/hotel.model';
import { Tarif } from '../../models/tarif.model';

@Component({
  selector: 'app-promoandtoplist',
  templateUrl: './promoandtoplist.component.html',
  styleUrls: ['./promoandtoplist.component.sass']
})
export class PromoandtoplistComponent implements OnInit {
  tarifM: Tarif;
  listeTarifs: Tarif[] = [];
  hotelsList: Hotel[] = [];
  hotelsTopList: Hotel[] = [];

  constructor(private hotelService: HotelService, private tarifService: TarifService) {
    this.hotelService.getAllPromotedHotels().then(res => {
      this.hotelsList = res;
      this.hotelsList.forEach(h => {
        this.hotelService.getPictures(h.id).then((img) => {
          h.images = img;
        });
        h.stars = [];
        for (let i = 0; i < h.nbEtoiles; i++)
        {
          h.stars.push(i);
        }
        this.tarifService.getAllTarifs();
      });
    });

    this.hotelService.getAllTopHotels().then(data => {
      this.hotelsTopList = data;
      this.hotelsTopList.forEach(ht => {
        this.hotelService.getPictures(ht.id).then((img) => {
          ht.images = img;
        });
        ht.stars = [];
        for (let i = 0; i < ht.nbEtoiles; i++)
        {
          ht.stars.push(i);
        }
        this.tarifService.getAllTarifs();
      });
    });

    this.tarifService.getAllTarifs();
  }

  ngOnInit(): void {
  }
}
