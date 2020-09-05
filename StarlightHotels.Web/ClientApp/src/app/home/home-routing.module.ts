import { NgModule } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HotelSearchComponent } from './hotel-search/hotel-search.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationCreateComponent } from './reservation/reservation-create/reservation-create.component';
import { ReservationConfirmationComponent } from './reservation/reservation-confirmation/reservation-confirmation.component';
import { ReservationDetailTarifComponent } from './reservation/reservation-create/reservation-detail-tarif/reservation-detail-tarif.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'home/hotel-search',
    component: HotelSearchComponent
  },
  { path: 'home/list-of-bookings', component: ReservationComponent },
  { path: 'home/book-hotel/:id', component: ReservationCreateComponent },
  { path: 'home/book-hotel/confirm', component: ReservationConfirmationComponent },
  { path: 'home/book-hotel/detailTarif/:id', component: ReservationDetailTarifComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
