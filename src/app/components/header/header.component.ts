import { TranslateService } from '@ngx-translate/core';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { OrderService } from '../../core/services/order.service';
import { StorageService } from '../../core/services/storage.service';

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

  constructor(private orderService: OrderService,
              private translate: TranslateService) {
    if (StorageService.getData('orders')) {
      this.count = JSON.parse(StorageService.getData('orders')).length;
    }
    const lang = StorageService.getData('lang') ? StorageService.getData('lang') : 'en';
    translate.setDefaultLang('en');
    translate.use(lang);
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

  public switchLang(elem: HTMLLIElement) {
    const lang = elem.dataset.lang;
    const childes = elem.parentElement.children;
    this.translate.use(lang);
    StorageService.saveItem('lang', lang);
    elem.classList.add('active');
    for (let i = 0; i < childes.length; i += 1 ) {
      if (childes[i] !== elem) {
        childes[i].classList.remove('active');
      }
    }
  }

}
