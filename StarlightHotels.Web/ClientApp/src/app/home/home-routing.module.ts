import { NgModule } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HotelSearchComponent } from './hotel-search/hotel-search.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationCreateComponent } from './reservation/reservation-create/reservation-create.component';
import { ReservationConfirmationComponent } from './reservation/reservation-confirmation/reservation-confirmation.component';
import { ReservationDetailTarifComponent } from './reservation/reservation-create/reservation-detail-tarif/reservation-detail-tarif.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { ContactComponent } from './contact/contact.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ConfirmedReservationComponent } from './reservation/confirmed-reservation/confirmed-reservation.component';
import { ReservationDetailComponent } from './reservation/reservation-detail/reservation-detail.component';
import { FactureComponent } from './facture/facture.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'home/hotel-search', component: HotelSearchComponent },
  { path: 'home/hotel-detail/:id', component: HotelDetailComponent },
  { path: 'home/list-of-bookings', component: ReservationComponent },
  { path: 'home/book-hotel/:id', component: ReservationCreateComponent },
  { path: 'home/confirm-reservation/:id', component: ReservationConfirmationComponent },
  { path: 'home/book-hotel/detailBooking/:id', component: ReservationDetailComponent },
  { path: 'home/book-hotel/detailTarif/:id', component: ReservationDetailTarifComponent },
  { path: 'home/book-hotel/confirmed/:id', component: ConfirmedReservationComponent },
  { path: 'home/contact', component: ContactComponent },
  { path: 'home/user', component: UserComponent },
  { path: 'home/user/registration', component: RegistrationComponent },
  { path: 'home/user/login', component: LoginComponent },
  { path: 'home/user/user-detail', component: UserDetailComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'home/invoice', component: FactureComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
