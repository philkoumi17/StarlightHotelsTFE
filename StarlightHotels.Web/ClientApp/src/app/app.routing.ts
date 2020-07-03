import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { NavbarComponent } from "./shared/navbar/navbar.component";

const routes: Routes =[
    { path: '', redirectTo: '/user/registration', pathMatch: 'full' },
    { path: '', component: NavbarComponent},
    { path: 'user', component: UserComponent,
      children: [
        { path: 'registration', component: RegistrationComponent }
      ] 
    }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }