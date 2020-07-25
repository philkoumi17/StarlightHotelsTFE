import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select'; 
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule} from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserService } from "./services/user.service";
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { UserComponent } from './components/user/user.component';
import { AuthInterceptor } from "./auth/auth.interceptor";
import { HotelDetailComponent } from './components/hotel/hotel-detail/hotel-detail.component';
import { HotelCreateComponent } from './components/hotel/hotel-create/hotel-create.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    UserComponent,
    RegistrationComponent,
    HomeComponent,
    LoginComponent,
    HotelComponent,
    HotelDetailComponent,
    HotelCreateComponent,
    UserDetailComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    BrowserAnimationsModule,
    MatCheckboxModule,  
    MatDialogModule,  
    MatToolbarModule,  
    MatInputModule,  
    MatSelectModule,   
    MatTabsModule,
    MatTableModule
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }], 
  entryComponents: [
    RegistrationComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }