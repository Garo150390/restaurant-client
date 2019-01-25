import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductsModel} from '../models/products.model';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class MenuService {

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Array<ProductsModel>> {
    return this.http.get<Array<ProductsModel>>(`${environment.apiEndPoint}products.json`);
  }
}
