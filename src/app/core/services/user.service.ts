import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { UserResponse, UserModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<Array<UserModel>> {
    return this.http.get<Array<UserModel>>(`${environment.apiEndPoint}/users`);
  }

  public createUser(obj): Observable<UserResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'multipart/form-data')
      .set('Mimetype', 'image/jpeg');

    return this.http.post<UserResponse>(`${environment.apiEndPoint}/users`, obj, { headers });
  }

  public getUserById(id): Observable<UserModel> {
    return this.http.get<UserModel>(`${environment.apiEndPoint}/users/${id}`);
  }

}
