import { Component, Inject, OnInit } from '@angular/core';
import { Participant } from '../../../models/participant.model';
import { ReservationService } from '../../../services/reservation.service';
import { HotelService } from '../../../services/hotel.service';
import { SearchHotelModel } from '../../../models/search-hotel.model';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/models/hotel.model';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { HotelCategorie } from 'src/app/models/hotel-categorie.model';
import { TarifService } from 'src/app/services/tarif.service';
import { Tarif } from '../../../models/tarif.model';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Formule } from 'src/app/models/formule.model';

@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.css']
})
export class ReservationCreateComponent implements OnInit {
  hotel: Hotel = {} as Hotel;
  stars: number[] = [];
  hotelId;
  isRoomSelection: boolean = true;
  hotelCategoryList: HotelCategorie[];
  tarifList: Tarif[];
  categoryList: Categorie[];
  joinedcategoryList: HotelCategorie[] = [];
  joinedcategory: HotelCategorie;
  participantList: Participant[] = [];
  searchInstance: SearchHotelModel = {} as SearchHotelModel;
  reservationId = 1; // TODO, set reservation id after save data in db

  confirmOrder: boolean;
  confirmedCategoryList: HotelCategorie[] = [];
  totalAmount: number = 0;

  constructor(
    private categorieService: CategorieService,
    private bookingService: ReservationService,
    private hotelService: HotelService,
    private tarifService: TarifService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.hotelId = params.get('id');
    });

    // TODO: Get hotel rooms
    console.log(this.hotelId);
    this.hotelService.getHotelById(this.hotelId).then(res => {
      this.hotel = res;
      for (let i = 0; i < this.hotel.nbEtoiles; i++) {
        this.stars.push(i);
      }
    });
    this.getCategory(this.hotelId);
    let today = new Date();

    this.hotelService.searchData.subscribe(data => this.searchInstance = data);
    // this.reservationService.participantData.subscribe(data => this.participantList = data);
  }

  async getCategory(hotelId: number) {
    this.categorieService.getAllCategories().then(res => {
      this.categoryList = res;
    });

    // Get price from service
    await this.categorieService.GetHotelCategory(hotelId).then(async (res) => {
      this.hotelCategoryList = res;
      await this.tarifService.getTarifCategorieById(this.hotelCategoryList).then((result) => {
        this.tarifList = result;

        this.tarifList.forEach(tarif => {
          this.hotelCategoryList.forEach(hotelcategorie => {
            if (tarif.id === hotelcategorie.categorieId) {
              hotelcategorie.prix = tarif.prix;
            }
          });
        });
      });
    });

    this.categoryList.forEach(obj => {
      this.hotelCategoryList.forEach(hotelcategorie => {
        // another loop
        if (obj.id === hotelcategorie.categorieId) {
          this.joinedcategory = {
            categorieId: hotelcategorie.categorieId,
            descriptif: obj.descriptif,
            type: obj.type,
            imageUrl: hotelcategorie.imageUrl,
            prix: hotelcategorie.prix,
          };
          this.joinedcategoryList.push(this.joinedcategory);
        }
      });
    });
  }

  getNbPart(value: number)
  {
    if (this.participantList.length > value)
    {
      this.participantList.splice(-1, 1);
    }
    else if (this.participantList.length < value)
    {
      // tslint:disable-next-line: variable-name
      for (let _i = this.participantList.length; _i < value; _i++) {
        let participant: Participant = {} as Participant;
        this.participantList.push(participant);
      }
    }
    return;
  }

  /* Booking form appear in the other component */
  OnServiceChanged(formule: Formule)
  {
    console.log(formule);
  }

  doAction() {
    this.confirmOrder = !this.confirmOrder;
  }

  // saveBookingLater()
  // {
  //   this.reservationService.
  // }

  /**
   * Set the confirmation details
   * @param categorie
   * @param quantity
   */
  setConfirmation(categorie: HotelCategorie, quantity: number) {
    categorie.quantity = quantity;

    console.log(this.searchInstance.arrivalDate);
    console.log(this.searchInstance.departureDate);

    let numberOfDays = 0;
    if (this.searchInstance.arrivalDate && this.searchInstance.departureDate)
    {
      let diff = Math.abs(this.searchInstance.departureDate.getTime() - this.searchInstance.arrivalDate.getTime());
      numberOfDays = Math.ceil(diff / (1000 * 3600 * 24));

      console.log(numberOfDays);
    }

    let found = false;
    this.confirmedCategoryList.forEach((confirmedCategory, index) => {
      // another loop
      if (confirmedCategory.categorieId === categorie.categorieId) {
        found = true;
        if (quantity > 0) {
          confirmedCategory.quantity = quantity;
        } else {
          this.confirmedCategoryList.splice(index, 1);
        }
      }
    });

    if (!found && quantity > 0) {
      this.confirmedCategoryList.push(categorie);
    }

    // Calculate total amount
    let totalQuantity = 0;
    this.confirmedCategoryList.forEach((confirmedCategory, index) => {
      totalQuantity += confirmedCategory.quantity * confirmedCategory.prix;
    });

    this.totalAmount = numberOfDays * totalQuantity;

    return;
  }

  // createReservation() {
  //   // Create reservation object
  //   this.bookingService.insertBooking().subscribe(
  //     (res: any) => {
  //       if(res.succeeded)
  //       {
  //         this.bookingService.formModel.reset();
  //         // this.toastr.success('New user created', 'Registration successful !');
  //         this.snackBar.open('New booking created, Booking successful !', '', {
  //           duration: 2000,
  //           verticalPosition: 'top',
  //           horizontalPosition: 'right',
  //           panelClass: 'snackbar-success',
  //         });
  //         this.dialogRef.close();
  //       }
  //       else
  //       {
  //         res.errors.forEach(element => {
  //           switch(element.code)
  //           {
  //             case 'DuplicateUserName':

  //               // Username is already taken
  //               // this.toastr.error('Username is already taken', 'Registration failed !');
  //               this.snackBar.open('Booking is already taken, Booking failed !', '', {
  //                 duration: 2000,
  //                 verticalPosition: 'top',
  //                 horizontalPosition: 'right',
  //                 panelClass: 'snackbar-danger',
  //               });
  //               break;
  //             default:
  //               // Registration failed
  //               // this.toastr.error(element.description, 'Registration failed !');
  //               this.snackBar.open(element.description + ', Booking failed !', '', {
  //                 duration: 2000,
  //                 verticalPosition: 'top',
  //                 horizontalPosition: 'right',
  //                 panelClass: 'snackbar-danger',
  //               });
  //               break;
  //           }
  //         });
  //       }
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }
}
