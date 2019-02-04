import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {OrderService} from '../../core/services/order.service';
import {StorageService} from '../../core/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('navItems')
  private navItems: ElementRef;
  private items: HTMLCollection;
  public count: number;

  constructor(private orderService: OrderService) {
    if (StorageService.getData('orders')) {
      this.count = JSON.parse(StorageService.getData('orders')).length;
    }
  }

  ngOnInit() {
    this.orderService.ordersCount
      .subscribe((data) => {
        this.count = data;
      });
  }

  ngAfterViewInit(): void {
    this.items = this.navItems.nativeElement.children;
  }

  public changeMenu(elem) {
    for (let i = 0; i < this.items.length; i += 1) {
      this.items[i].classList.remove('active');
    }
    elem.classList.add('active');
  }

}
