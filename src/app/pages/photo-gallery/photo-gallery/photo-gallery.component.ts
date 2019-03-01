import {
  Gallery,
  GalleryItem,
  GalleryRef,
  ThumbnailsPosition
} from '@ngx-gallery/core';
import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Lightbox } from '@ngx-gallery/lightbox';
import { ActivatedRoute } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, OnInit } from '@angular/core';

import { GalleryService } from '../../../core/services/gallery.service';
import { ImageModel } from '../../../core/models';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({transform: 'scale(0.5)', opacity: 0}),
        animate('.75s ease-out',
          style({transform: 'scale(1)', opacity: 1})
        )
      ]),
      transition(':leave', [
        style({transform: 'scale(1)', opacity: 1, height: '*'}),
        animate('.75s ease-out',
          style({transform: 'scale(0.5)', opacity: 0})
        )
      ]),
    ]),
  ]
})
export class PhotoGalleryComponent implements OnInit {

  public photos: Array<ImageModel>;
  public galleryItems: Array<GalleryItem>;
  public p: number;
  public total: number;
  public itemsPerPage = GalleryService.limit;
  public lightboxGalleryRef: GalleryRef;
  public galleryId = 'myLightbox';

  constructor(public gallery: Gallery,
              public lightbox: Lightbox,
              private route: ActivatedRoute,
              private elementReference: ElementRef,
              private galleryService: GalleryService,
              private overlayContainer: OverlayContainer) {

    this.p = 1;

    if (overlayContainer.getContainerElement()) {
      setTimeout(() => elementReference.nativeElement.children[2].appendChild(overlayContainer.getContainerElement()), 0);
    }
  }

  ngOnInit() {
    this.photos = this.route.snapshot.data.photos.data;
    this.total = this.route.snapshot.data.photos.total;
    this.galleryItems = this.galleryService.getGalleryItem(this.photos);
    this.gallery.ref().load(this.galleryItems);
    this.lightboxGalleryRef = this.gallery.ref(this.galleryId);

    this.gallery.ref().setConfig({
      // imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
      loop: true,
      loadingStrategy: 'lazy',
      disableThumb: true,
    });
    this.lightboxGalleryRef.setConfig({
      // imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
      loop: true,
      loadingStrategy: 'lazy',
      disableThumb: true,
    });
    this.lightboxGalleryRef.load(this.galleryItems);
    const galeryRef = this.gallery.ref('gallery');

    galeryRef.itemClick.subscribe(res => {
      this.lightbox.open(res);
    });
  }

  public changePage(page: number): void {
    this.galleryService.getPhotos(page)
      .subscribe((data) => {
        this.photos = data.data;
        this.p = page;
        this.lightboxGalleryRef.load(this.galleryService.getGalleryItem(data.data));
      }, (error) => {
        console.log(error);
      });
  }
}
