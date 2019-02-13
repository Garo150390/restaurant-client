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

  public name: FormControl;
  public surname: FormControl;
  public email: FormControl;
  public phone: FormControl;
  public address: FormControl;
  public reservationForms: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  private createFormControls(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.pattern(ValidatorHelper.nameRegEx)
    ]);
    this.surname = new FormControl('', []);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(ValidatorHelper.emailRegEx),
    ]);
    this.phone = new FormControl('', [
      Validators.required,
    ]);
  }

  private createForm(): void {
    this.reservationForms = new FormGroup({
      'name': this.name,
      'surname': this.surname,
      'email': this.email,
      'phone': this.phone,
    });
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
