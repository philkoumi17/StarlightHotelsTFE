import { NgModule } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HotelSearchComponent } from './hotel-search/hotel-search.component';

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
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
