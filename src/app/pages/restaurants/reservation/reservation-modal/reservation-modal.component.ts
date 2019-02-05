import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ValidatorHelper } from '../../../../core/helpers/validator.helper';
import { ValidateService } from '../../../../core/services/validate.service';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss']
})
export class ReservationModalComponent implements OnInit {

  public reservationForms: FormGroup;

  constructor() {
    this.reservationForms = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.pattern(ValidatorHelper.nameRegEx)
      ]),
      'surname': new FormControl('', []),
      'email': new FormControl('', [
        Validators.required,
        Validators.pattern(ValidatorHelper.emailRegEx),
      ]),
      'phone': new FormControl('', [
        Validators.required,
      ])
    });
  }

  ngOnInit() {
  }

  public alertValidate(event) {
    ValidateService.alertValidate(event, this.reservationForms);
  }

  public submitReservationForm() {
    if (this.reservationForms.invalid) {
      ValidateService.validateAllFormFields(this.reservationForms);
    } else {
      console.log(this.reservationForms.getRawValue());
    }
  }

}
