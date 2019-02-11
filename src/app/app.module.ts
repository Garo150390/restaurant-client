import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GallerizeModule } from '@ngx-gallery/gallerize';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RestaurantCardComponent } from './pages/home/restaurant-card/restaurant-card.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './components/app.component';
import { BlogsModule } from './pages/blogs/blogs.module';
import { OrderModule } from './pages/order/order.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import {OverlayContainer} from '@angular/cdk/overlay';
import {AppOverlayContainer} from './pages/photo-gallery/custom-overlay-container';
import {PhotoGalleryModule} from './pages/photo-gallery/photo-gallery.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    NotFoundComponent,
    RestaurantCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    BlogsModule,
    OrderModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    GalleryModule.withConfig({
      loadingMode: 'indeterminate',
    }),
    LightboxModule,
    GallerizeModule
  ],
  providers: [
    /*{
      provide: OverlayContainer,
      useFactory: () => new AppOverlayContainer(PhotoGalleryModule)
    },*/
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
