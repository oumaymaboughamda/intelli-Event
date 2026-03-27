
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private url = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.url}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.url}/login`, user);
  }
}