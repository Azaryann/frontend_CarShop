import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { AuthRequest, AuthResponse } from '../models/auth.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:8080/auth';
  private currentUser: { username: string } | null = null;

  constructor(private http: HttpClient) {}

  getCurrentUser() {
    console.log('Current user:', this.currentUser);
    return this.currentUser;
  }

  register(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, authRequest);
  }

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, authRequest).pipe(
      tap((response: AuthResponse) => {
        // Сохраняем username из запроса, так как в ответе только токен
        this.currentUser = {
          username: authRequest.username
        };
        // Сохраняем токен
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('token');
  }
}


