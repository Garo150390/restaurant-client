import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {MenuService} from '../../../core/services/menu.service';
import {ProductsModel} from '../../../core/models/products.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {

  private products: Array<ProductsModel>;
  public productList: Array<ProductsModel>;

  @ViewChild('filters')
  private filters;

  private childrens;

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.getProducts()
      .subscribe((products) => {
        this.products = products;
        this.productList = this.products;
      }, (error) => {
        console.log(error);
      });
  }

  ngAfterViewInit(): void {
    this.childrens = this.filters.nativeElement.children;
  }

  public changeMenu(value) {
    console.log(this.childrens);
    let el;
    for (let i = 0; i < this.childrens.length; i += 1) {
      const name = this.childrens[i].dataset.filter;
      this.childrens[i].classList.remove('active');
      if (name === value) {
        el = this.childrens[i];
      }
    }
    el.classList.add('active');
    if (value === '*') {
      return this.productList = this.products;
    }
    this.productList = this.products.filter((product) => {
      return product.category === value;
    });
  }

}
