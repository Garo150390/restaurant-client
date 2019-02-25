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
    ReservationService.request.startTime = this.time.startTime;
    ReservationService.request.endTime = this.time.endTime;
    this.dialog.open(ReservationModalComponent, {
      width: '550px',
      data: {}
    });
  }

}
