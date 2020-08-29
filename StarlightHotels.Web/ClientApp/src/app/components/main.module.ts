import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './home/contact/contact.component';
import { HotelComponent } from './hotel/hotel.component';
import { HotelCreateComponent } from './hotel/hotel-create/hotel-create.component';
import { HotelDetailComponent } from './hotel/hotel-detail/hotel-detail.component';
import { HotelSearchComponent } from './hotel/hotel-search/hotel-search.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ConfirmedReservationComponent } from './reservation/confirmed-reservation/confirmed-reservation.component';
import { ExecutePaymentComponent } from './reservation/execute-payment/execute-payment.component';
import { ReservationConfirmationComponent } from './reservation/reservation-confirmation/reservation-confirmation.component';
import { ReservationCreateComponent } from './reservation/reservation-create/reservation-create.component';
import { ReservationDetailTarifComponent } from './reservation/reservation-create/reservation-detail-tarif/reservation-detail-tarif.component';
import { ReservationDetailComponent } from './reservation/reservation-detail/reservation-detail.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { MainRoutingModule } from './main-routing.module';
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

@NgModule({
  declarations: [
    DashboardComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    HotelComponent,
    HotelCreateComponent,
    HotelDetailComponent,
    HotelSearchComponent,
    NavbarComponent,
    ReservationComponent,
    ConfirmedReservationComponent,
    ExecutePaymentComponent,
    ReservationConfirmationComponent,
    ReservationCreateComponent,
    ReservationDetailTarifComponent,
    ReservationDetailComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    UserDetailComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MainRoutingModule,
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
    NgbModule
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  entryComponents: [
    RegistrationComponent,
    HotelCreateComponent,
    HotelDetailComponent,
    ReservationCreateComponent,
    ReservationDetailComponent,
    ReservationConfirmationComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})

export class MainModule {
}
