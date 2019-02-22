import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../core/services/storage.service';
import { OrderService } from '../../core/services/order.service';
import { OrderProductsModel } from '../../core/models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public products: Array<OrderProductsModel> = [];

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    if (StorageService.getData('orders')) {
      this.orderService.orders = JSON.parse(StorageService.getData('orders'));
    }

    this.products = this.orderService.orders;
  }

}
