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
  public price: number;

  constructor(private orderService: OrderService) {
  }

  private totalePrice() {
    const price = this.products.map((x) => {
      return x.price * x.count;
    });
    this.price = price.reduce((x, y) => {
      return x + y;
    });
  }

  ngOnInit() {
    if (StorageService.getData('orders')) {
      this.orderService.orders = JSON.parse(StorageService.getData('orders'));
    }

    this.products = this.orderService.orders;

    if (this.products.length) {
      this.totalePrice();
    }
  }

  public addCount(index) {
    this.products[index].count += 1;
    this.price += this.products[index].price;
    StorageService.clearItem('orders');
    StorageService.saveItem('orders', JSON.stringify(this.products));
  }

  public reduceCount(index) {
    if (this.products[index].count > 1) {
      this.products[index].count -= 1;
      this.price -= this.products[index].price;
      StorageService.clearItem('orders');
      StorageService.saveItem('orders', JSON.stringify(this.products));
    }
  }

  public deleteProduct(index) {
    this.products.splice(index, 1);
    StorageService.clearItem('orders');
    StorageService.saveItem('orders', JSON.stringify(this.products));
    if (this.products.length) {
      this.totalePrice();
    }
    this.orderService.changeDetect();
  }

  public sendData() {
    console.log(this.products);
  }
}
