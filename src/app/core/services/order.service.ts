import { ReplaySubject} from 'rxjs';
import { DoCheck, Injectable} from '@angular/core';

import 'rxjs/add/observable/from';

import { OrderProductsModel } from '../models';

@Injectable()
export class OrderService implements DoCheck {

  public orders: Array<OrderProductsModel> = [];

  private ordersSubject = new ReplaySubject<number>(1);
  public ordersCount = this.ordersSubject.asObservable();

  constructor() {
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
    }
  }

  ngDoCheck(): void {
    this.ordersSubject.next(this.orders.length);
  }

  public changeDetect() {
    if (!this.orders.length) {
      return this.ordersSubject.next(0);
    }
    this.ordersSubject.next(this.orders.length);
    console.log(this.orders.length);
  }
}
