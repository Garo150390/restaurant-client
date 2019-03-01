import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ImageItem } from '@ngx-gallery/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { GalleryModel, ImageModel } from '../models/';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  static readonly limit = 9;

  constructor(private http: HttpClient) { }

  public getPhotos(id): Observable<GalleryModel> {
    const offset = id !== 1 ? (id - 1) * GalleryService.limit : 0;
    const params = new HttpParams().set('offset', `${offset}`).set('limit', `${GalleryService.limit}`);
    return this.http.get<GalleryModel>(`${environment.apiEndPoint}/gallery`, { params })
      .pipe(
        map(gallery => {
          gallery.data.map(photo => {
            photo.src = `${environment.apiEndPoint}/${photo.src}`;
            photo.thumb = `${environment.apiEndPoint}/${photo.thumb}`;
            return photo;
          });
          return gallery;
        })
      );
  }

  public getGalleryItem(images: Array<ImageModel>): Array<ImageItem> {
    const data: Array<ImageItem> = [];
    images.map((item) => {
      data.push(new ImageItem({
        src: item.src,
        thumb: item.thumb,
      }));
    });
    return data;
  }
}
