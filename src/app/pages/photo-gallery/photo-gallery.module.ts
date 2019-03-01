import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryModule } from '@ngx-gallery/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GallerizeModule } from '@ngx-gallery/gallerize';

import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { PhotoGalleryRoutingModule } from './photo-gallery-routing.module';
import { GalleryService } from '../../core/services/gallery.service';
import { SharedModule } from '../../shared/shared.module';
import { PhotoComponent } from './photo/photo.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../core/interceptor/token.interceptor';

@NgModule({
  declarations: [
    PhotoComponent,
    PhotoGalleryComponent
  ],
  imports: [
    CommonModule,
    PhotoGalleryRoutingModule,
    SharedModule,
    GalleryModule.withConfig({
      loadingMode: 'determinate',
    }),
    LightboxModule.withConfig({
      panelClass: 'fullscreen',
    }),
    GallerizeModule,
    NgxPaginationModule,
  ],
  providers: [
    GalleryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
    /*{
      provide: OverlayContainer,
      useFactory: () => new AppOverlayContainer(PhotoGalleryComponent)
    },*/
  ]
})
export class PhotoGalleryModule {
}
