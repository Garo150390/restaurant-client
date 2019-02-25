import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ReservationService } from '../../../../core/services/reservation.service';
import { ValidateService } from '../../../../core/services/validate.service';
import { ValidatorHelper } from '../../../../core/helpers/validator.helper';

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
  public occasions: FormControl;
  public message: FormControl;
  public reservationForms: FormGroup;
  public celebrations = [
    {value: 'birthday', name: 'Birthday'},
    {value: 'anniversary', name: 'Anniversary'},
    {value: 'date-night', name: 'Date night'},
    {value: 'business-meal', name: 'Business meal'},
    {value: 'celebration', name: 'Celebration'},
  ];

  constructor(private reservationService: ReservationService,
              public dialogRef: MatDialogRef<ReservationModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
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
    this.surname = new FormControl('', [
      Validators.pattern(ValidatorHelper.nameRegEx)
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(ValidatorHelper.emailRegEx),
    ]);
    this.phone = new FormControl('', [
      Validators.required,
      Validators.pattern(ValidatorHelper.phoneRegex),
    ]);
    this.message = new FormControl('');
    this.occasions = new FormControl(null);
  }

  private createForm(): void {
    this.reservationForms = new FormGroup({
      'name': this.name,
      'surname': this.surname,
      'email': this.email,
      'phone': this.phone,
      'occasions': this.occasions,
      'message': this.message,
    });
  }

  public submitReservationForm() {
    if (this.reservationForms.invalid) {
      ValidateService.validateAllFormFields(this.reservationForms);
    } else {
      const orderedData = ReservationService.request;
      const reservationFormValues = this.reservationForms.getRawValue();
      ReservationService.request = {
        ...orderedData,
        ...reservationFormValues
      };
      this.reservationService.bookingTable(ReservationService.request)
        .subscribe((data) => {
          console.log(data);
        }, (err) => {
          console.log(err);
        });
    }
  }
}
