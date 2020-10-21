import { Component, OnInit } from '@angular/core';
import { ReservationChambreService } from 'src/app/services/reservation-chambre.service';
import { MatDialog } from '@angular/material/dialog';
import { ReservationChambre } from 'src/app/models/reservationChambre.model';
import { Etat } from 'src/app/models/etat.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  allResCh: ReservationChambre[];
  allEtats: Etat[];
  constructor(private resChService: ReservationChambreService,
              private userService: UserService,
              public dialog: MatDialog)
  {
  }

  async ngOnInit()
  {
    await this.loadData();
  }


  async loadData()
  {
    await this.resChService.getChambreReserveesAsync().then((data) => {
      this.allResCh = data;
      this.allResCh.forEach(u => {
        this.userService.getBookings(u.reservationId).then((res) => {
          u.reservations = res;
        });
      });
    }).catch(console.log);
  }
}
