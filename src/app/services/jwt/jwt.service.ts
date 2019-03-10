import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface Response {
  status: number;
  result: any;
}

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient) {
  }

  postLoginDetails(loginDetails: {email: string, password: string}) {
    return this.http.post<Response>('http://localhost:3000/login', loginDetails).subscribe(data => {
      console.log(data.result.token);
    });
  }
}
