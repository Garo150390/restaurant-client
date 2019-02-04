import 'rxjs/add/observable/from';
import { ReplaySubject} from 'rxjs';
import { DoCheck, Injectable} from '@angular/core';

import { StorageService } from './storage.service';
import { OrderProductsModel } from '../models';

@Injectable()
export class OrderService implements DoCheck {

  public orders: Array<OrderProductsModel> = [];

  private ordersSubject = new ReplaySubject<number>(1);
  public ordersCount = this.ordersSubject.asObservable();

  constructor() {
    if (StorageService.getData('orders')) {
      this.orders = JSON.parse(StorageService.getData('orders'));
    }
  }

  public addToOrders(product: OrderProductsModel) {
    let exist = false;
    this.orders.forEach((prod) => {
      if (prod.id === product.id) {
        exist = true;
      }
    });
    if (!exist) {
      this.orders.push(product);
      this.ordersSubject.next(this.orders.length);
      StorageService.saveItem('orders', JSON.stringify(this.orders));
      JSON.parse(StorageService.getData(product.id));
    }
  }

  ngDoCheck(): void {
    this.ordersSubject.next(this.orders.length);
  }

  public changeDetect() {
    console.log(this.orders);
    if (!this.orders.length) {
      return this.ordersSubject.next(0);
    }
    this.ordersSubject.next(this.orders.length);
    console.log(this.orders.length);
  }
}
