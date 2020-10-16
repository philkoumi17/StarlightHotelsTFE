import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Participant } from '../../../models/participant.model';
import { ReservationService } from '../../../services/reservation.service';
import { BehaviorSubject } from 'rxjs';
import { HotelService } from '../../../services/hotel.service';
import { SearchHotelModel } from '../../../models/search-hotel.model';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/models/hotel.model';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { HotelCategorie } from 'src/app/models/hotel-categorie.model';
import { JoinHotelCategorie } from '../../../models/join-hotel-categorie.model';

@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.css']
})
export class ReservationCreateComponent implements OnInit {
  modelArrival: NgbDateStruct;
  modelDeparture: NgbDateStruct;
  minDate: NgbDateStruct;
  hotel: Hotel;
  stars: number[] = [];
  hotelId;
  isRoomSelection: boolean = true;
  hotelCategoryList: HotelCategorie[];
  categoryList: Categorie[];
  joinedcategoryList: JoinHotelCategorie[] = [];
  joinedcategory: JoinHotelCategorie;
  participantList: Participant[] = [];
  searchInstance: SearchHotelModel = {} as SearchHotelModel;

  reservationId = 1; // TODO, set reservation id after save data in db

  constructor(
    private categorieService: CategorieService,
    private reservationService: ReservationService,
    private hotelService: HotelService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.hotelId = params.get('id');
    });

    // TODO: Get hotel rooms
    console.log(this.hotelId);
    this.hotelService.getHotelById(this.hotelId).then(res => {
      this.hotel = res;
      for (let i = 0; i < this.hotel.nbEtoiles; i++)
      {
        this.stars.push(i);
      }
    });
    this.getCategory(this.hotelId);
    let today = new Date();
    this.minDate = { year: today.getFullYear(), month: today.getMonth(), day: today.getDay() };

    this.hotelService.searchData.subscribe(data => this.searchInstance = data);
    // this.reservationService.participantData.subscribe(data => this.participantList = data);
  }
  getCategory(hotelId: number) {
    this.categorieService.getAllCategories().then(res => {
      this.categoryList = res;
    });
   // get price from service
    this.categorieService.GetHotelCategory(hotelId).then(res => {
     this.hotelCategoryList = res;
     this.categoryList.forEach(obj  => {
       this.hotelCategoryList.forEach( hotelcategorie => {
         // another loop
        if (obj.id === hotelcategorie.categorieId){
          this.joinedcategory = {
            descriptif : obj.descriptif,
            type: obj.type,
            imageUrl: hotelcategorie.imageUrl
            // price:
          };
          this.joinedcategoryList.push(this.joinedcategory);
        }
       });
    });
   });
  }

  getNbPart(value: number) {

    if (this.participantList.length > value) {
      this.participantList.splice(-1, 1);
    } else if (this.participantList.length < value) {

      // tslint:disable-next-line: variable-name
      for (let _i = this.participantList.length; _i < value; _i++) {
        let participant: Participant = {} as Participant;
        this.participantList.push(participant);
      }
    }
    return;
  }
}
