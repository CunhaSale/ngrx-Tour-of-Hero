import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class AuthService {
  private BASE_URL = 'http://localhost:1337';

  constructor(private http: HttpClient) { }

  getToken(): string{
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any>{
    return this.http.post<User>(`${this.BASE_URL}/login`, {email, password})
  }

}
