import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {OrderService} from '../../core/services/order.service';

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

  constructor(private orderService: OrderService) { }

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
