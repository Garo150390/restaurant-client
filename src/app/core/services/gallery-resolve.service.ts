import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ImageItem } from '@ngx-gallery/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { GalleryService } from './gallery.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryResolveService implements  Resolve<any> {

  constructor(private galleryService: GalleryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.galleryService.getPhotos(1);
  }
}
