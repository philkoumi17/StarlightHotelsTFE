import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { ChambreService } from 'src/app/services/chambre.service';
import { HotelService } from 'src/app/services/hotel.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { ReservationChambreService } from 'src/app/services/reservation-chambre.service';
import { UserService } from 'src/app/services/user.service';
import { Utilisateur } from 'src/app/models/user.model';
import { Hotel } from 'src/app/models/hotel.model';
import { ReservationChambre } from 'src/app/models/reservationChambre.model';

@Component({
  selector: 'app-confirmed-reservation',
  templateUrl: './confirmed-reservation.component.html',
  styleUrls: ['./confirmed-reservation.component.css']
})
export class ConfirmedReservationComponent implements OnInit {
  hotel: Hotel = {} as Hotel;
  resChambre: ReservationChambre = {} as ReservationChambre;
  stars: number[] = [];
  resChId;
  user: Utilisateur;

  constructor(private authService: AuthenticationService,
              private userService: UserService,
              private categorieService: CategorieService,
              private bookingService: ReservationService,
              private chambreService: ChambreService,
              private hotelService: HotelService,
              private resChambreService: ReservationChambreService,
              private snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute) { }

  async ngOnInit() {
    this.authService.currentUserData.subscribe(data => this.user = data);
    this.route.paramMap.subscribe(params => {
      this.resChId = params.get('id');
    });

    this.hotelService.getHotelById(this.resChId).then(res => {
      this.hotel = res;
      for (let i = 0; i < this.hotel.nbEtoiles; i++)
      {
        this.stars.push(i);
      }
    });

    this.resChambreService.getReservationChambreById(this.resChId).then(res => {
      this.resChambre = res;
    });
  }

}
