import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { ContactComponent } from './contact/contact.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { SearchComponent } from './search/search.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelSearchComponent } from './hotel-search/hotel-search.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ConfirmedReservationComponent } from './reservation/confirmed-reservation/confirmed-reservation.component';
import { ExecutePaymentComponent } from './reservation/execute-payment/execute-payment.component';
import { ReservationConfirmationComponent } from './reservation/reservation-confirmation/reservation-confirmation.component';
import { ReservationCreateComponent } from './reservation/reservation-create/reservation-create.component';
import { ReservationDetailTarifComponent } from './reservation/reservation-create/reservation-detail-tarif/reservation-detail-tarif.component';
import { ReservationDetailComponent } from './reservation/reservation-detail/reservation-detail.component';
import { ParticipantComponent } from './participant/participant.component';
import { AddParticipantComponent } from './participant/add-participant/add-participant.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { NewspartnersandnetworksComponent } from './newspartnersandnetworks/newspartnersandnetworks.component';
import { PromoandtoplistComponent } from './promoandtoplist/promoandtoplist.component';
import { WeatherComponent } from './weather/weather.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FactureComponent } from './facture/facture.component';
import { BookingFormComponent } from './reservation/booking-form/booking-form.component';

@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent,
    NavbarComponent,
    FooterComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    UserDetailComponent,
    SearchComponent,
    HotelDetailComponent,
    HotelSearchComponent,
    ReservationComponent,
    ConfirmedReservationComponent,
    ExecutePaymentComponent,
    ReservationConfirmationComponent,
    ReservationCreateComponent,
    ReservationDetailTarifComponent,
    ReservationDetailComponent,
    ParticipantComponent,
    AddParticipantComponent,
    CarrouselComponent,
    NewspartnersandnetworksComponent,
    PromoandtoplistComponent,
    WeatherComponent,
    ForbiddenComponent,
    FactureComponent,
    BookingFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HomeRoutingModule,
    MatCheckboxModule,
    MatDialogModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule,
    MatSnackBarModule
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  entryComponents: [
    ReservationCreateComponent,
    ReservationDetailComponent,
    ReservationConfirmationComponent,
    ConfirmedReservationComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})

export class HomeModule {
}
