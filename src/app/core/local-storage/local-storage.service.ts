import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key: string): any {
    return JSON.parse(localStorage.getItem(`${environment.appPrefix}${key}`) || '{}');
  }

  setItem(key: string, value: any) {
    localStorage.setItem(`${environment.appPrefix}${key}`, JSON.stringify(value));
  }

  removeItem(key: string) {
    localStorage.removeItem(`${environment.appPrefix}${key}`);
  }
}
