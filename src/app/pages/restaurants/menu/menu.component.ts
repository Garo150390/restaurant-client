import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { ProductsModel } from '../../../core/models';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({transform: 'scale(0.5)', opacity: 0}),
        animate('.75s ease-out',
          style({transform: 'scale(1)', opacity: 1})
        )
      ]),
      transition(':leave', [
        style({transform: 'scale(1)', opacity: 1, height: '*'}),
        animate('.75s ease-out',
          style({transform: 'scale(0.5)', opacity: 0})
        )
      ]),
    ]),
  ]
})
export class MenuComponent implements AfterViewInit, OnChanges {

  @Input()
  public products: Array<ProductsModel>;

  public productList: Array<ProductsModel>;
  public menu: Set<string>;

  @ViewChild('filters')
  private filters;

  private childes;

  constructor() {
    this.menu = new Set();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.products.forEach((product) => {
      product.categories.forEach((category) => {
        this.menu.add(category);
      });
      product.image = `${environment.apiEndPoint}/${product.image}`;
    });
    this.productList = this.products;
  }

  ngAfterViewInit(): void {
    this.childes = this.filters.nativeElement.children;
  }

  public changeMenu(elem) {
    for (let i = 0; i < this.childes.length; i += 1) {
      this.childes[i].classList.remove('active');
    }
    elem.classList.add('active');
    if (elem.dataset.filter === '*') {
      return this.productList = this.products;
    }
    this.productList = this.products.filter((product) => product.categories.includes(elem.dataset.filter));
  }

}
