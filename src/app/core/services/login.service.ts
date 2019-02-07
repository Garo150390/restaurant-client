import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { UserResponse, TokensModel } from '../models';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {
  }

  public login(data): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${environment.apiEndPoint}/users/login`, data);
  }

  public refreshToken(refreshToken): Observable<TokensModel> {
    return this.http.post<TokensModel>(`${environment.apiEndPoint}/refresh`, { refreshToken });
  }
}
