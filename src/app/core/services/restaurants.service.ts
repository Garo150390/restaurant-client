import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { RestaurantsModel } from '../models';
import {map} from 'rxjs/operators';

@Injectable()
export class RestaurantsService {

  constructor(private http: HttpClient) {
  }

  public getRestaurants(): Observable<Array<RestaurantsModel>> {
    return this.http.get<Array<RestaurantsModel>>(`${environment.apiEndPoint}/restaurants`)
      .pipe(
        map(res => {
          return res.map((restaurant) => {
            restaurant.avatar = `${environment.apiEndPoint}/${restaurant.avatar}`;
            return restaurant;
          });
        })
      );
  }

  public getRestaurantById(id): Observable<RestaurantsModel> {
    return this.http.get<RestaurantsModel>(`${environment.apiEndPoint}/restaurants/${id}`)
      .pipe(
        map(res => {
          res.avatar = `${environment.apiEndPoint}/${res.avatar}`;
          return res;
        })
      );
  }

}
