import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderedProductsComponent } from './ordered-products/ordered-products.component';
import { OrderRequestService } from '../../core/services/order-request.service';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { ValidateService } from '../../core/services/validate.service';
import { SharedModule } from '../../shared/shared.module';
import { OrderComponent } from './order.component';
import {TranslateModule} from '@ngx-translate/core';

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
    SharedModule,
    TranslateModule
  ],
  exports: [
    OrderModalComponent,
    OrderComponent
  ],
  providers: [
    OrderRequestService,
    ValidateService
  ]
})
export class OrderModule { }
