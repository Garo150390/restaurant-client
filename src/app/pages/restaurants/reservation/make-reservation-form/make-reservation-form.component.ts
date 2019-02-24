import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDatepickerConfig, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { ReservationService } from '../../../../core/services/reservation.service';
import { ValidateService } from '../../../../core/services/validate.service';
import { TimeModel } from '../../../../core/models';

declare const $: any;

@Component({
  selector: 'app-make-reservation-form',
  templateUrl: './make-reservation-form.component.html',
  styleUrls: ['./make-reservation-form.component.scss'],
  providers: [NgbTimepickerConfig]
})
export class MakeReservationFormComponent implements OnInit {

  public reserveForm: FormGroup;
  public startTime: TimeModel = { hour: 13, minute: 30 };
  public endTime: TimeModel = { hour: 15, minute: 10 };
  public date: FormControl;
  public guestsCount: FormControl;
  public showSpinner = false;
  public tables: Array<any>;

  constructor(private config: NgbTimepickerConfig,
              private dateConfig: NgbDatepickerConfig,
              private reservationService: ReservationService,
              private route: ActivatedRoute) {

    const currentDate = new Date();
    config.spinners = false;
    dateConfig.minDate = {year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate()};
    dateConfig.outsideDays = 'hidden';
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  private createFormControls(): void {
    this.date = new FormControl('', [Validators.required]);
    this.guestsCount = new FormControl('1');
  }

  private createForm(): void {
    this.reserveForm = new FormGroup({
      'date': this.date,
      'guestsCount': this.guestsCount,
    });
  }

  public alertValidate(event) {
    ValidateService.alertValidate(event, this.reserveForm);
  }

  private checkTimeCharacter(time) {
    time.hour = time.hour.toString().length === 2 ? time.hour : '0' + time.hour;
    time.minute = time.minute.toString().length === 2 ? time.minute : '0' + time.minute;
  }

  submitReserveForm() {
    if (this.reserveForm.invalid) {
      return ValidateService.validateAllFormFields(this.reserveForm);
    }
    this.showSpinner = true;
    const {date, guestsCount} = this.reserveForm.getRawValue();
    this.checkTimeCharacter(this.startTime);
    this.checkTimeCharacter(this.endTime);
    ReservationService.request = {
      date: `${date.year}-${date.month}-${date.day}`,
      guestsCount,
      startTime: this.startTime,
      endTime: this.endTime,
      restaurantId: this.route.snapshot.params.id,
    };
    this.reservationService.checkFreeTable(ReservationService.request)
      .subscribe((data) => {
        if (!data.data.length) {
          this.tables = null;
          this.showSpinner = false;
          return $('#reservation').modal('show');
        }
        data.data.forEach((time) => {
          this.checkTimeCharacter(time.startTime);
          this.checkTimeCharacter(time.endTime);
        });
        this.tables = data.data;
      }, (error) => {
        this.showSpinner = false;
        console.log(error);
      });
  }


}
