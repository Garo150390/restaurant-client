import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderedProductsComponent } from './ordered-products/ordered-products.component';
import { OrderHelperService } from '../../core/services/orderHelper.service';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { ValidateService } from '../../core/services/validate.service';
import { OrderService } from '../../core/services/order.service';
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
    OrderHelperService,
    OrderService,
    ValidateService
  ]
})
export class OrderModule { }
