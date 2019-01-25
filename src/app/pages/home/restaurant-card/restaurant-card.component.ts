import {Component, Input, OnInit} from '@angular/core';
import {RestaurantsModel} from '../../../core/models/restaurants.model';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss']
})
export class RestaurantCardComponent implements OnInit {

  @Input()
  public restaurant: RestaurantsModel;

  constructor() { }

  ngOnInit() {
  }

}
