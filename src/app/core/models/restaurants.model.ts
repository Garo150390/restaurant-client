import {ProductsModel} from './products.model';

export interface RestaurantsModel {
  id: number;
  name: string;
  type: string;
  description: string;
  avatar: string;
  address: string;
  email: string;
  tel: string;
  products: [ProductsModel];
}
