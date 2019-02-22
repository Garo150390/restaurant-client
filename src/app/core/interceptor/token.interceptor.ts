import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

import {StorageService} from '../services/storage.service';
import {LoginService} from '../services/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if ((req.method === 'POST' && req.url.match(/(?:user|user\/login)$/)) ||
      (req.method === 'GET' && req.url.includes('assets'))) {
      return next.handle(req);
    }
    if (!StorageService.getData('accessToken')) {
      return next.handle(req);
    }
    const request = req.clone({
      headers: new HttpHeaders({
        'authorization': `Bearer ${StorageService.getData('accessToken')}`
      })
    });
    return next.handle(request).do((event: HttpEvent<any>) => {
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.error.message === 'Token expired!') {
          this.loginService.refreshToken(StorageService.getData('refreshToken'))
            .subscribe((tokens) => {
              StorageService.saveItem('accessToken', tokens.accessToken);
              StorageService.saveItem('refreshToken', tokens.refreshToken);
            }, (error) => {
              console.log(error);
            });
        }
      }
    });
  }
}
