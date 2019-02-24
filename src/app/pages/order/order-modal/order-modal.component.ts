import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ValidateService } from '../../../core/services/validate.service';
import { ValidatorHelper } from '../../../core/helpers/validator.helper';
import { StorageService } from '../../../core/services/storage.service';
import { OrderedProductModel, OrderModel } from '../../../core/models';
import {OrderService} from '../../../core/services/order.service';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent {

  public orderForms: FormGroup;
  public pay: boolean;

  constructor(private orderService: OrderService) {
    this.orderForms = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.pattern(ValidatorHelper.nameRegEx)
      ]),
      'phone': new FormControl('', [
        Validators.required,
        Validators.pattern(ValidatorHelper.phoneRegex)
      ]),
      'address': new FormControl('', [])
    });
  }

  public checked(data: boolean) {
    this.pay = data;
  }

  public alertValidate(event) {
    ValidateService.alertValidate(event, this.orderForms);
  }

  public sendOrderForms() {
    if (this.orderForms.invalid) {
      return ValidateService.validateAllFormFields(this.orderForms);
    }
    const localOrders = JSON.parse(StorageService.getData('orders'));
    const products: OrderedProductModel = localOrders.map((prod) => {
      const { id: productId, count: quantity } = prod;
      return { productId, quantity };
    });

    const order: OrderModel = { ...this.orderForms.getRawValue(), products, method: 'cash' };
    this.orderService.createOrder(order)
      .subscribe((data) => {
        console.log(data);
      }, (err) => {
        console.log(err);
      });
  }

}
