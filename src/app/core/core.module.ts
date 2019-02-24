import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { RestaurantsService } from './services/restaurants.service';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { AuthGuardService } from './services/auth-guard.service';
import { StorageService } from './services/storage.service';
import { OrderHelperService } from './services/orderHelper.service';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    RestaurantsService,
    StorageService,
    OrderHelperService,
    LoginService,
    AuthGuardService,
  ]
})
export class CoreModule { }
