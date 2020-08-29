import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './home/contact/contact.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { HotelComponent } from './hotel/hotel.component';
import { HotelSearchComponent } from './hotel/hotel-search/hotel-search.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationCreateComponent } from './reservation/reservation-create/reservation-create.component';
import { ReservationConfirmationComponent } from './reservation/reservation-confirmation/reservation-confirmation.component';
import { ReservationDetailTarifComponent } from './reservation/reservation-create/reservation-detail-tarif/reservation-detail-tarif.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  { path: 'contact', component: ContactComponent },
  { path: 'user', component: UserComponent },
  { path: 'user-detail', component: UserDetailComponent },
  // Si aucune connaissance du lien, cela redirige vers la page d'accueil
  { path: 'hotel', component: HotelComponent },
  { path: 'hotel-search', component: HotelSearchComponent },
  { path: 'list-of-bookings', component: ReservationComponent },
  { path: 'book-hotel/:id', component: ReservationCreateComponent },
  { path: 'book-hotel/confirm', component: ReservationConfirmationComponent },
  { path: 'book-hotel/detailTarif/:id', component: ReservationDetailTarifComponent },
  { path: 'dashboard', component: DashboardComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
