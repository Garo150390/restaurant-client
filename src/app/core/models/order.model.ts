export interface OrderProductModel {
  id: string;
  title: string;
  count: number;
  price: number;
  img: string;
}

export interface OrderModel {
  address: string;
  name: string;
  phone: string;
  method: 'cash' | 'visa';
  transactionId?: string;
  products: [OrderedProductModel];
}

export interface OrderedProductModel {
  productId: string;
  quantity: number;
}
