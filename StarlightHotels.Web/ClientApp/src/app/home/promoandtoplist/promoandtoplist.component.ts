import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { TarifService } from '../../services/tarif.service';
import { Hotel } from '../../models/hotel.model';
import { Tarif } from '../../models/tarif.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HotelDetailComponent } from '../hotel-detail/hotel-detail.component';

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
  lowest = 9999999;

  constructor(private hotelService: HotelService, private tarifService: TarifService, public dialog: MatDialog) {
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
        this.tarifService.getAllTarifs().then(res1 => {
          this.listeTarifs = res1;
          this.listeTarifs.forEach(l => {
            if (this.lowest > l.prix){
              this.lowest = l.prix;
              this.tarifM = l;
            }
          });
        });
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

  async ngOnInit() {

    // await this.hotelService.getAllHotelDetails().then((data) => {
    //   console.log(data);
    // });
  }

  openDialogHotelDetail(data)
  {
    // tslint:disable-next-line: no-debugger
    debugger;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
        top: '100px',
        left: '500px'
    };
    dialogConfig.width = '500px';
    dialogConfig.height = '500px';
    dialogConfig.data = {
        id: data.id
    };
    this.dialog.open(HotelDetailComponent, dialogConfig);
  }

  openDialogHotelDetailTop(data)
  {
    // tslint:disable-next-line: no-debugger
    debugger;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
        top: '100px',
        left: '500px'
    };
    dialogConfig.width = '500px';
    dialogConfig.height = '500px';
    dialogConfig.data = {
        id: data.id
    };
    this.dialog.open(HotelDetailComponent, dialogConfig);
  }
}
