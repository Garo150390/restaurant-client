import { ReplaySubject} from 'rxjs';
import { DoCheck, Injectable} from '@angular/core';

import { StorageService } from './storage.service';
import { OrderProductModel} from '../models';

@Injectable()
export class OrderHelperService implements DoCheck {

  public static orders: Array<OrderProductModel> = [];

  private ordersSubject = new ReplaySubject<number>(1);
  public ordersCount = this.ordersSubject.asObservable();

  constructor() {
    if (StorageService.getData('orders')) {
      OrderHelperService.orders = JSON.parse(StorageService.getData('orders'));
    }
  }

  ngDoCheck(): void {
    this.ordersSubject.next(OrderHelperService.orders.length);
  }

  public addToOrders(product: OrderProductModel) {
    let exist = false;
    OrderHelperService.orders.forEach((prod) => {
      if (prod.id === product.id) {
        exist = true;
      }
    });
    if (!exist) {
      OrderHelperService.orders.push(product);
      this.ordersSubject.next(OrderHelperService.orders.length);
      StorageService.saveItem('orders', JSON.stringify(OrderHelperService.orders));
      JSON.parse(StorageService.getData(product.id));
    }
  }

  public changeBasketProductsCount() {
    if (!OrderHelperService.orders.length) {
      return this.ordersSubject.next(0);
    }
    this.ordersSubject.next(OrderHelperService.orders.length);
  }
}
