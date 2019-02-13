import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ImageItem } from '@ngx-gallery/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { GalleryModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) { }

  public getPhotos(id): Observable<{data: ImageItem[], total: number}> {
    const params = new HttpParams().set('offset', id).set('limit', '9');
    return this.http.get<GalleryModel>(`${environment.localEndPoint}gallery.json`, { params })
      .pipe(
          map(res => {
            const data: Array<ImageItem> = [];
            res.data.map((item) => {
              data.push(new ImageItem({
                src: 'assets/images/gallery/' + item.name,
                thumb: 'assets/images/gallery/' + item.name,
              }));
            });
            return { data, total: res.total};
          },
        )
      );
  }

  public getPhotos2(id): Observable<{data: ImageItem[], total: number}> {
    const params = new HttpParams().set('offset', id);
    return this.http.get<GalleryModel>(`${environment.localEndPoint}gallery2.json`, { params })
      .pipe(
        map(res => {
            const data: Array<ImageItem> = [];
            res.data.map((item) => {
              data.push(new ImageItem({
                src: 'assets/images/gallery/' + item.name,
                thumb: 'assets/images/gallery/' + item.name,
              }));
            });
            return { data, total: res.total};
          },
        )
      );
  }
}
