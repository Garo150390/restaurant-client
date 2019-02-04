import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { RestaurantsService } from './services/restaurants.service';
import { StorageService } from './services/storage.service';
import { OrderService } from './services/order.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    RestaurantsService,
    StorageService,
    OrderService
  ]
})
export class CoreModule { }
