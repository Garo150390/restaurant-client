import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';


@Injectable()
export class ReservationService {

  public static request: any = {};

  constructor(private http: HttpClient) { }

  public getTables(): Observable<any> {
    return this.http.get<any>(`${environment.localEndPoint}tables.json`, );
  }
}
