import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDatepickerConfig, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { ReservationService } from '../../../../core/services/reservation.service';
import { ValidateService } from '../../../../core/services/validate.service';
import { TimeModel } from '../../../../core/models';
import {MatDialog} from '@angular/material';
import {ReservationModalComponent} from '../reservation-modal/reservation-modal.component';

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
  public errorMessage: string;
  public tables: Array<any>;

  public guests = [
    {value: '1', name: 'for 1'},
    {value: '2', name: 'for 2'},
    {value: '3', name: 'for 3'},
    {value: '4', name: 'for 4'},
    {value: '5', name: 'for 5'},
  ];

  constructor(private config: NgbTimepickerConfig,
              private dateConfig: NgbDatepickerConfig,
              private reservationService: ReservationService,
              private route: ActivatedRoute,
              public dialog: MatDialog) {

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
    this.date = new FormControl('', Validators.required);
    this.guestsCount = new FormControl('1');
  }

  private createForm(): void {
    this.reserveForm = new FormGroup({
      'date': this.date,
      'guestsCount': this.guestsCount,
    });
  }

  submitReserveForm() {
    if (this.reserveForm.invalid) {
      return ValidateService.validateAllFormFields(this.reserveForm);
    }
    this.showSpinner = true;
    const {date, guestsCount} = this.reserveForm.getRawValue();
    const startTime = moment({...date, ...this.startTime }).format('YYYY-MM-DD HH:mm');
    const endTime = moment({...date, ...this.endTime }).format('YYYY-MM-DD HH:mm');
    ReservationService.request = {
      guestsCount,
      startTime,
      endTime,
      restaurantId: this.route.snapshot.params.id,
    };
    this.reservationService.checkFreeTable(ReservationService.request)
      .subscribe((data) => {
        if (!data.data.length) {
          this.tables = null;
          this.showSpinner = false;
          this.dialog.open(ReservationModalComponent, {
            width: '550px',
            data: {}
          });
        }
        data.data.forEach((time) => {
          time.startTime = moment(time.startTime).format('HH:mm');
          time.endTime = moment(time.endTime).format('HH:mm');
        });
        this.tables = data.data;
      }, (error) => {
        console.log(error);
        this.showSpinner = false;
        if (error.status === 401) {
          this.errorMessage = error.error.message;
        }
      });
  }


}
