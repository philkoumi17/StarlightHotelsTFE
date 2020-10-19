import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Payment } from '../../../models/payment.model';
import { Reservation } from '../../../models/reservation.model';
import { ReservationService } from '../../../services/reservation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../../services/authentication.service';
import { Utilisateur } from '../../../models/user.model';

@Component({
  selector: 'app-execute-payment',
  templateUrl: './execute-payment.component.html',
  styleUrls: ['./execute-payment.component.css']
})
export class ExecutePaymentComponent implements OnInit {

  @ViewChild('form') form: ElementRef;

  @Input() payment: Payment = {} as Payment;
  user: Utilisateur;

  constructor(
    private authService: AuthenticationService,
    private bookingService: ReservationService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authService.currentUserData.subscribe(data => this.user = data);
  }

  async submitForm() {
    // Create reservation object
    let body: Reservation = {
      applicationUserId: this.payment.applicationUserId,
      dateReservation: this.payment.dateReservation,
      montant: this.payment.amount,
      etatId: 1
    };

    await this.bookingService.insertBooking(body).then((result) => {
      this.payment.orderId = result.idRes;
      // Route vers confirmation page
      this.form.nativeElement.submit();

    }).catch(() => {
      this.snackBar.open("Une erreur s'est produit lors de la réservation", '', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: 'snackbar-danger',
      });
    });
  }
}
