import { Component, OnInit } from '@angular/core';

import { RestaurantsService } from '../../core/services/restaurants.service';
import { RestaurantsModel } from '../../core/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public resataurantsList: Array<RestaurantsModel>;

  constructor(private restaurantsService: RestaurantsService) {
  }

  ngOnInit() {
    this.restaurantsService.getRestaurants()
      .subscribe((data) => {
        this.resataurantsList = data;
      },
        (error) => {
          console.log(error);
        }
      );
  }

}

