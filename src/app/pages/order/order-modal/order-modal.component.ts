import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ValidatorHelper } from '../../../core/helpers/validator.helper';
import { ValidateService } from '../../../core/services/validate.service';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent {

  public orderForms: FormGroup;
  public pay: boolean;

  constructor() {
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
      ValidateService.validateAllFormFields(this.orderForms);
    } else {
      const data = JSON.parse(StorageService.getData('orders'));
      const products = data.map((prod) => {
        const { id: product_id, count: product_count, price } = prod;
        const product_total = parseInt(price, 10) * parseInt(product_count, 10);
        return {product_id, product_total, product_count};
      });
      const delivery_total_price = products.map((prod) => {
        return prod.product_total;
      }).reduce((x, y) => {
        return x + y;
      });
      const request = {...this.orderForms.getRawValue(), products, delivery_total_price };
      console.log(request);
    }
  }

}
