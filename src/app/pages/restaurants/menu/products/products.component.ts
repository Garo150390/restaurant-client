import { Component, Input } from '@angular/core';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';

import { OrderProductsModel, ProductsModel } from '../../../../core/models';
import { OrderService } from '../../../../core/services/order.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  @Input()
  public product: ProductsModel;

  private album: Array<any> = [];

  constructor(private orderService: OrderService,
              private lightbox: Lightbox, private lightBoxConfig: LightboxConfig) {
    lightBoxConfig.centerVertically = true;
    lightBoxConfig.fitImageInViewPort = false;
  }

  public addToOrder(product: ProductsModel) {
    const prod: OrderProductsModel = {
      id: product._id,
      title: product.name,
      count: 1,
      price: parseInt(product.price, 10),
      img: product.image,
    };
    this.orderService.addToOrders(prod);
  }

  public open() {
    this.album[0] = { src: `${this.product.image}` };
    this.lightbox.open(this.album, 0);
  }

}
