import {Component, OnInit} from '@angular/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { ActivatedRoute } from '@angular/router';
import { Gallery, GalleryItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';

import { GalleryService } from '../../../core/services/gallery.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss'],
})
export class PhotoGalleryComponent implements OnInit {

  public photos: GalleryItem[];

  public galleryId = 'myLightbox';

  constructor(private galleryService: GalleryService,
              public gallery: Gallery,
              private lightbox: Lightbox,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.photos = this.route.snapshot.data.photos;
    this.gallery.ref().load(this.photos);
    const lightboxGalleryRef = this.gallery.ref(this.galleryId);

    lightboxGalleryRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
      loop: true,
      loadingStrategy: 'lazy',
      disableThumb: true,
    });
    lightboxGalleryRef.load(this.photos);
  }

}
