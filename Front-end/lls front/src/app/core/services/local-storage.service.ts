import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  getLocal(key: string): any {
    const llsKey = 'lls-' + key;
    const data = window.localStorage.getItem(llsKey);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }
  setLocal(key: string, value: any): void {
    const lls = 'lls-' + key;
    const data = value === undefined ? '' : JSON.stringify(value);
    window.localStorage.setItem(lls, data);
  }

  /* Remove All Locals Except User Lang */
  removeAllLocals(): void {
    for (const key in window.localStorage) {
      if (
        window.localStorage.hasOwnProperty(key) &&
        key !== 'lls-userLang'
      ) {
        window.localStorage.removeItem(key);
      }
    }
  }
  removeLocal(key: string): void {
    window.localStorage.removeItem('lls-' + key);
  }
}
