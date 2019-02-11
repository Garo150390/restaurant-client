import {Component, ElementRef, OnInit} from '@angular/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { ActivatedRoute } from '@angular/router';
import { Gallery, GalleryItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';

import { GalleryService } from '../../../core/services/gallery.service';
import {OverlayContainer} from '@angular/cdk/overlay';

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
              private route: ActivatedRoute,
              private elementReference: ElementRef,
              private overlayContainer: OverlayContainer) {
    if (overlayContainer.getContainerElement()) {
      setTimeout(() => elementReference.nativeElement.children[2].appendChild(overlayContainer.getContainerElement()), 0);
    }
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
