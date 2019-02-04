import { NgModule } from '@angular/core';
import { LightboxModule } from 'ngx-lightbox';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReservationModalComponent } from './reservation/reservation-modal/reservation-modal.component';
import { ReservationService } from '../../core/services/reservation.service';
import { ReservationComponent } from './reservation/reservation.component';
import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { ProductsComponent } from './menu/products/products.component';
import { RestauranComponent } from './restauran/restauran.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuService } from '../../core/services/menu.service';
import { SharedModule } from '../../shared/shared.module';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    RestauranComponent,
    MenuComponent,
    ProductsComponent,
    ReservationComponent,
    ReservationModalComponent
  ],
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    LightboxModule
  ],
  providers: [
    MenuService,
    ReservationService
  ]
})
export class RestaurantsModule { }
