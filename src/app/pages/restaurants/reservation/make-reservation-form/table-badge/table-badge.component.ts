import {Component, Input, OnInit} from '@angular/core';

import { ReservationService } from '../../../../../core/services/reservation.service';

@Component({
  selector: 'app-table-badge',
  templateUrl: './table-badge.component.html',
  styleUrls: ['./table-badge.component.scss']
})
export class TableBadgeComponent implements OnInit {

  @Input()
  public data: any;

  constructor() { }

  ngOnInit() {
  }

  public selectTable(): void {
    ReservationService.request.lunch_start = this.data.time;
  }

}
