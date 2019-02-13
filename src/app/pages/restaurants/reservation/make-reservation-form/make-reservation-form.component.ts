import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDate, NgbDatepickerConfig, NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ReservationService} from '../../../../core/services/reservation.service';
import { ValidateService } from '../../../../core/services/validate.service';

declare var $: any;

@Component({
  selector: 'app-make-reservation-form',
  templateUrl: './make-reservation-form.component.html',
  styleUrls: ['./make-reservation-form.component.scss'],
  providers: [NgbTimepickerConfig]
})
export class MakeReservationFormComponent implements OnInit {

  public reserveForm: FormGroup;
  public timer1 = {hour: 13, minute: 30};
  public timer2 = {hour: 15, minute: 0};
  public date: FormControl;
  public count: FormControl;
  public success = false;
  public request = false;
  public tables: any;

  constructor(private config: NgbTimepickerConfig,
              private dateCongig: NgbDatepickerConfig) {
    const currentDate = new Date();
    config.spinners = false;
    dateCongig.minDate = {year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate()};
    dateCongig.maxDate = {year: 2019, month: 2, day: 31};
    dateCongig.outsideDays = 'hidden';
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
    this.success = true;
    if (this.reserveForm.invalid) {
      ValidateService.validateAllFormFields(this.reserveForm);
    } else {
      const { date, count } = this.reserveForm.getRawValue();
      const lunch_start = `${this.timer1.hour}:${this.timer1.minute}`;
      const lunch_end = `${this.timer2.hour}:${this.timer2.minute}`;
      const request = {
        day: `${date.year}-${date.month}-${date.day}`,
        lunch_start,
        lunch_end,
        guests_number: count
      };
      ReservationService.request = {...request};
      console.log(ReservationService.request);
      this.request = true;
      setTimeout(() => {
        this.tables = [
          {
            time: '11:11 - 12:00',
          },
          {
            time: '13:30 - 14:40',
          }
        ];
        this.success = false;
        this.request = false;
        // $('#reservation').modal('show');
      }, 1500);
    }
  }

}
