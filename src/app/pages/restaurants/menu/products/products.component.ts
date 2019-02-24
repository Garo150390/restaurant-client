import { Component, Input } from '@angular/core';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';

import { OrderProductModel, ProductsModel} from '../../../../core/models';
import { OrderHelperService } from '../../../../core/services/orderHelper.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  @Input()
  public product: ProductsModel;

  private album: Array<any> = [];

  constructor(private orderService: OrderHelperService,
              private lightbox: Lightbox, private lightBoxConfig: LightboxConfig) {
    lightBoxConfig.centerVertically = true;
    lightBoxConfig.fitImageInViewPort = false;
  }

  public addToOrder(product: ProductsModel) {
    const prod: OrderProductModel = {
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
