import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { Component, Input, OnInit } from '@angular/core';

import { OrderProductsModel, ProductsModel } from '../../../../core/models';
import { OrderService } from '../../../../core/services/order.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input()
  public product: ProductsModel;

  private album: Array<any> = [];

  constructor(private orderService: OrderService,
              private lightbox: Lightbox, private lightBoxConfig: LightboxConfig) {
    lightBoxConfig.centerVertically = true;
    lightBoxConfig.fitImageInViewPort = false;
  }

  ngOnInit() {
  }

  public addToOrder(product: ProductsModel) {
    const prod: OrderProductsModel = {
      id: product.id,
      title: product.title,
      count: 1,
      price: parseInt(product.price, 10),
      img: product.img
    };
    this.orderService.addToOrders(prod);
  }

  public open() {
    this.album[0] = { src: `assets/images/products/${this.product.img}` };
    this.lightbox.open(this.album, 0);
  }

}
