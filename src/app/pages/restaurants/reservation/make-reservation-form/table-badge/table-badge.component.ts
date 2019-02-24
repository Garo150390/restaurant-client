import { Component, Input } from '@angular/core';

import { ReservationService } from '../../../../../core/services/reservation.service';

@Component({
  selector: 'app-table-badge',
  templateUrl: './table-badge.component.html',
  styleUrls: ['./table-badge.component.scss']
})
export class TableBadgeComponent {

  @Input()
  public time: any;

  constructor() { }

  public selectTable(): void {
    ReservationService.request.startTime = this.time.startTime;
    ReservationService.request.endTime = this.time.endTime;
  }

}
