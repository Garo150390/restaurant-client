import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RestaurantsService} from '../../../core/services/restaurants.service';
import {RestaurantsModel} from '../../../core/models';

@Component({
  selector: 'app-restauran',
  templateUrl: './restauran.component.html',
  styleUrls: ['./restauran.component.scss']
})
export class RestauranComponent implements OnInit {

  public restaurant: RestaurantsModel;

  constructor(private router: ActivatedRoute,
              private restaurantsService: RestaurantsService) { }

  ngOnInit() {
    this.router.params
      .subscribe((data) => {
        this.restaurantsService.getRestaurantById(data.id)
          .subscribe((restaurant) => {
              this.restaurant = restaurant;
          }, (err) => {
            console.log(err);
          });
      }, (err) => {
        console.log(err);
      });
  }

}
