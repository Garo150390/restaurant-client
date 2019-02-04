import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestauranComponent } from './restauran/restauran.component';

const routes: Routes = [
  {
    path: '',
    component: RestauranComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
