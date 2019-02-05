import { Component, Input, OnInit } from '@angular/core';

import { OrderProductsModel } from '../../../core/models';
import { StorageService } from '../../../core/services/storage.service';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-ordered-products',
  templateUrl: './ordered-products.component.html',
  styleUrls: ['./ordered-products.component.scss']
})
export class OrderedProductsComponent implements OnInit {

  @Input()
  public products: Array<OrderProductsModel>;

  public price: number;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    if (this.products.length) {
      this.totalePrice();
    }
  }

  private totalePrice() {
    const price = this.products.map((x) => {
      return x.price * x.count;
    });
    this.price = price.reduce((x, y) => {
      return x + y;
    });
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
