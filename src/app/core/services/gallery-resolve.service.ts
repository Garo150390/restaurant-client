import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
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
