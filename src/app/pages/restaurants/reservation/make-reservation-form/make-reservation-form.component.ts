import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationService} from '../../../../core/services/reservation.service';
import {ValidateService} from '../../../../core/services/validate.service';

declare var $: any;

@Component({
  selector: 'app-make-reservation-form',
  templateUrl: './make-reservation-form.component.html',
  styleUrls: ['./make-reservation-form.component.scss']
})
export class MakeReservationFormComponent implements OnInit {

  public reserveForm: FormGroup;
  public timer = {hour: 13, minute: 30};
  public date: FormControl;
  public count: FormControl;
  public success: boolean = false;
  public request: boolean = false;
  public tables: any;

  constructor() {
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  private createFormControls(): void {
    this.date = new FormControl('', [Validators.required]);
    this.count = new FormControl('1');
  }

  private createForm(): void {
    this.reserveForm = new FormGroup({
      'date': this.date,
      'count': this.count,
    });
  }

  public alertValidate(event) {
    ValidateService.alertValidate(event, this.reserveForm);
  }

  submitReservForm() {
    if (this.reserveForm.invalid) {
      ValidateService.validateAllFormFields(this.reserveForm);
    } else {
      const { date, count } = this.reserveForm.getRawValue();
      const {hour, minute} = this.timer;
      const lunch_start = `${hour}:${minute}`;
      const request = {
        day: `${date.year}-${date.month}-${date.day}`,
        lunch_start,
        guests_number: count
      };
      ReservationService.request = {...request};
      console.log(ReservationService.request);
      this.request = true;
      setTimeout(() => {
        this.tables = [
          {
            time: '11:11',
          },
          {
            time: '22:22',
          }
        ];
        this.success = false;
        this.request = false;
        // $('#reservation').modal('show');
      }, 1500);
    }
  }

}
