import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { HotelComponent } from './hotel/hotel.component';
import { AuthGuard } from "./auth/auth.guard";


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'user', component: UserComponent},
  // Si aucune connaissance du lien, cela redirige vers la page d'accueil
  { path: 'hotel', component: HotelComponent},
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