import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { AuthGuard } from './auth/auth.guard';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { ContactComponent } from './components/home/contact/contact.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'user', component: UserComponent},
  { path: 'user-detail', component: UserDetailComponent},
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
