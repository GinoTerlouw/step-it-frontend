import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityCheckService {
  private readonly connectionMonitor: Observable<boolean>;

  constructor() {
    this.connectionMonitor = new Observable((observer) => {
      window.addEventListener('offline', () => {
        observer.next(false);
      });

      window.addEventListener('online', () => {
        observer.next(true);
      });
    });
  }

  monitor(): Observable<boolean> {
    return this.connectionMonitor;
  }
}
