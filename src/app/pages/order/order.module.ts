import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderModalComponent } from './order-modal/order-modal.component';
import { OrderComponent } from './order.component';
import {OrderRequestService} from '../../core/services/order-request.service';
import {SharedModule} from '../../shared/shared.module';
import { OrderedProductsComponent } from './ordered-products/ordered-products.component';

@NgModule({
  declarations: [
    OrderModalComponent,
    OrderComponent,
    OrderedProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    OrderModalComponent,
    OrderComponent
  ],
  providers: [
    OrderRequestService
  ]
})
export class OrderModule { }