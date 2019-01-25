import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { RestaurantsModel } from '../models/restaurants.model';

@Injectable()
export class RestaurantsService {

  constructor(private http: HttpClient) {
  }

  public getRestaurants(): Observable<Array<RestaurantsModel>> {
    return this.http.get<Array<RestaurantsModel>>(`${environment.apiEndPoint}restaurants.json`);
  }

}
