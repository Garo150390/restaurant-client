import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ValidatorHelper } from '../../../core/helpers/validator.helper';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent implements OnInit {

  public orderForms: FormGroup;

  constructor() {
    this.orderForms = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.pattern(ValidatorHelper.nameRegEx)
      ]),
      'phone': new FormControl('', [
        Validators.required,
      ])
    });
  }

  ngOnInit() {
  }

  public sendOrderForms() {
    console.log(this.orderForms.getRawValue());
  }

}
