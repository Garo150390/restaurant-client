import { NgModule } from '@angular/core';
import { LightboxModule } from 'ngx-lightbox';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material';

import { MakeReservationFormComponent } from './reservation/make-reservation-form/make-reservation-form.component';
import { ReservationModalComponent } from './reservation/reservation-modal/reservation-modal.component';
import { TableBadgeComponent } from './reservation/make-reservation-form/table-badge/table-badge.component';
import { ReservationService } from '../../core/services/reservation.service';
import { ReservationComponent } from './reservation/reservation.component';
import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { ProductsComponent } from './menu/products/products.component';
import { ValidateService } from '../../core/services/validate.service';
import { RestaurantComponent } from './restauran/restaurant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuService } from '../../core/services/menu.service';
import { SharedModule } from '../../shared/shared.module';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    RestaurantComponent,
    MenuComponent,
    ProductsComponent,
    ReservationComponent,
    ReservationModalComponent,
    MakeReservationFormComponent,
    TableBadgeComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RestaurantsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    LightboxModule,

  ],
  providers: [
    MenuService,
    ReservationService,
    ValidateService
  ]
})
export class RestaurantsModule { }
