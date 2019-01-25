import { Component, Input, OnInit } from '@angular/core';
import { ProductsModel } from '../../../../core/models/products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input()
  public product: ProductsModel;

  constructor() { }

  ngOnInit() {
  }

}
