import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {ReservationService} from '../../../../core/services/reservation.service';
import {ValidatorHelper} from '../../../../core/helpers/validator.helper';

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

  public validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  public alertValidate(event) {
    if (this.reservationForms.controls[event.name].status === 'INVALID') {
      event.classList.add('bg-danger');
    } else {
      event.classList.remove('bg-danger');
    }
  }

  submitReservationForm() {
    if (this.reservationForms.invalid) {
      this.validateAllFormFields(this.reservationForms);
    } else {
      console.log(this.reservationForms.getRawValue());
    }
  }

}
