import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import {GalleryModel} from '../models';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) { }

  public getPhotos(): Observable<Array<GalleryModel>> {
    return this.http.get<Array<GalleryModel>>(`${environment.localEndPoint}gallery.json`);
  }
}
