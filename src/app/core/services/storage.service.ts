import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable()
export class StorageService {

  static saveItem(key: string, data: any): void {
    localStorage.setItem(`${environment.storageKey}${key}`, data);
  }

  static getData(key: string): string {
    return localStorage.getItem(`${environment.storageKey}${key}`);
  }

  static clearItem(key: string): void {
    localStorage.removeItem(`${environment.storageKey}${key}`);
  }

  static clearAll(): void {
    localStorage.clear();
  }
}
