export interface UserResponse {
  user: UserModel;
  tokens: TokensModel;
}

export interface TokensModel {
  accessToken: string;
  refreshToken: string;
}

export interface UserModel {
  _id: string;
  name: string;
  surname: string;
  age: number;
  email: string;
  address: Address;
  image: string;
}

export interface Address {
  country: string;
  city: string;
}
