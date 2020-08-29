import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllHotelComponent } from './all-hotels/all-hotels.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';


const routes: Routes = [
  {
    path: 'all-hotels',
    component: AllHotelComponent
  },
  {
    path: 'add-hotel',
    component: AddHotelComponent
  },
  {
    path: 'edit-hotel',
    component: EditHotelComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelRoutingModule { }
