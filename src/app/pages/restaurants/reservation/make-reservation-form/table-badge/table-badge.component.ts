import { Component, Input } from '@angular/core';

import { ReservationService } from '../../../../../core/services/reservation.service';
import {ReservationModalComponent} from '../../reservation-modal/reservation-modal.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-table-badge',
  templateUrl: './table-badge.component.html',
  styleUrls: ['./table-badge.component.scss']
})
export class TableBadgeComponent {

  @Input()
  public time: any;

  constructor(private dialog: MatDialog) { }

  public selectTable(): void {
    const startDate = ReservationService.request.startTime.split(' ')[0];
    const endDate = ReservationService.request.endTime.split(' ')[0];
    ReservationService.request.startTime = `${startDate} ${this.time.startTime}`;
    ReservationService.request.endTime = `${endDate} ${this.time.endTime}`;
    this.dialog.open(ReservationModalComponent, {
      width: '550px',
      data: {}
    });
  }

}
