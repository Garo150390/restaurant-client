import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ImageItem } from '@ngx-gallery/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { GalleryModel, ImageModel } from '../models/';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) { }

  public getPhotos(id): Observable<GalleryModel> {
    const params = new HttpParams().set('offset', id).set('limit', '10');
    return this.http.get<GalleryModel>(`${environment.localEndPoint}gallery.json`, { params });
  }

  public getPhotos2(id): Observable<GalleryModel> {
    const params = new HttpParams().set('offset', id);
    return this.http.get<GalleryModel>(`${environment.localEndPoint}gallery2.json`, { params });
  }

  public getGalleryItem(images: Array<ImageModel>): Array<ImageItem> {
    const data: Array<ImageItem> = [];
    images.map((item) => {
      data.push(new ImageItem({
        src: 'assets/images/gallery/' + item.name,
        thumb: 'assets/images/gallery/' + item.name,
      }));
    });
    return data;
  }
}
