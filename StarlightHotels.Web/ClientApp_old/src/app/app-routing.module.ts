import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { AuthGuard } from './auth/auth.guard';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { ContactComponent } from './components/home/contact/contact.component';
import { HotelSearchComponent } from './components/hotel/hotel-search/hotel-search.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ReservationCreateComponent } from './components/reservation/reservation-create/reservation-create.component';
import { ReservationDetailTarifComponent } from './components/reservation/reservation-create/reservation-detail-tarif/reservation-detail-tarif.component';
import { ReservationConfirmationComponent } from './components/reservation/reservation-confirmation/reservation-confirmation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'user', component: UserComponent},
  { path: 'user-detail', component: UserDetailComponent},
  // Si aucune connaissance du lien, cela redirige vers la page d'accueil
  { path: 'hotel', component: HotelComponent},
  { path: 'hotel-search', component: HotelSearchComponent},
  { path: 'list-of-bookings', component: ReservationComponent},
  { path: 'book-hotel/:id', component: ReservationCreateComponent},
  { path: 'book-hotel/confirm', component: ReservationConfirmationComponent},
  { path: 'book-hotel/detailTarif/:id', component: ReservationDetailTarifComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: false })
  ],
  exports: [RouterModule]
  })

export class AppRoutingModule { }
