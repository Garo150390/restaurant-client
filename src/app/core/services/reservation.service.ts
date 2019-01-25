import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';


@Injectable()
export class ReservationService {

  constructor(private http: HttpClient) { }

  public createUser(user): Observable<any> {
    return this.http.post<any>(`${environment.apiEndPoint}users.json`, user);
  }
}
