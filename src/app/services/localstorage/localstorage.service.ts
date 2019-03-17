import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private store: {
    [key: string]: string
  } = {};

  constructor() {
    this.loadStore();
  }

  get(key) {
    return this.store[key];
  }

  set(key, value) {
    this.store[key] = value;

    this.saveInStore();
  }

  loadStore() {
    try {
      this.store = JSON.parse(localStorage.getItem('store'));
    } catch (err) {
    }

    if (!this.store) {
      this.store = {};

      this.saveInStore();
    }
  }

  saveInStore() {
    localStorage.setItem('store', JSON.stringify(this.store));
  }

}
