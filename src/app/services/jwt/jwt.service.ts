import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import Resp from '../../interfaces/response.interface';
import {catchError} from 'rxjs/operators';
import {LocalstorageService} from '../localstorage/localstorage.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class JwtService {
  public redirectURL: string;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalstorageService,
    private router: Router
  ) {
  }

  handleHttpError(error: HttpErrorResponse): Observable<Resp> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.error.status}, ` +
        `body was: ${error.error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  isAuthenticated(): boolean {
    if (this.localStorageService.get('jwt')) {
      return true;
    }
  }

  login(loginDetails: { email: string, password: string }): void {
    const response: Observable<Resp> = this.http.post<Resp>(`${environment.apiURL}/login`, loginDetails)
      .pipe(
        catchError(this.handleHttpError)
      );

    response.subscribe((data) => {
      this.localStorageService.set('jwt', data.result.token);

      this.router.navigate(['/me/start']);
    });
  }

  signup(singupDetails: { name: string, email: string, password: string }): void {
    const response: Observable<Resp> = this.http.post<Resp>(`${environment.apiURL}/signup`, singupDetails)
      .pipe(
        catchError(this.handleHttpError)
      );

    response.subscribe((data) => {
      this.localStorageService.set('jwt', data.result.token);

      this.router.navigate(['/me/start']);
    });
  }
}

