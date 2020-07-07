import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'user', component: UserComponent},
  // Si aucune connaissance du lien, cela redirige vers la page d'accueil
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