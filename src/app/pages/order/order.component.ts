import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../core/services/storage.service';
import { OrderHelperService } from '../../core/services/orderHelper.service';
import { OrderProductModel } from '../../core/models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public products: Array<OrderProductModel> = [];

  constructor() {
  }

  ngOnInit() {
    if (StorageService.getData('orders')) {
      OrderHelperService.orders = JSON.parse(StorageService.getData('orders'));
    }

    this.products = OrderHelperService.orders;
  }

}
