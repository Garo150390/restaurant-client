import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

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

  constructor(private orderService: OrderService,
              private cd: ChangeDetectorRef) {
  }

  private totalePrice() {
    const price = this.products.map((x) => {
      return x.price * x.count;
    });
    this.price = price.reduce((x, y) => {
      return x + y;
    });
    console.log(this.price);
  }

  ngOnInit() {
    this.products = this.orderService.orders;
    if (this.products.length) {
      this.totalePrice();
    }
  }

  public addCount(index) {
      this.products[index].count += 1;
      this.price += this.products[index].price;
      this.orderService.changeDetect();
  }

  public reduceCount(index) {
    if (this.products[index].count > 1) {
      this.products[index].count -= 1;
      this.price -= this.products[index].price;
    }
  }

  public deleteProduct(index) {
    this.products.splice(index, 1);
    if (this.products.length) {
      this.totalePrice();
    }
    this.orderService.changeDetect();
  }

}
