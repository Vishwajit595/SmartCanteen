import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl =
    'https://smartcanteen-c012.onrender.com/api/auth';

  constructor(
    private http: HttpClient
  ) {}

  register(userData: any) {

    return this.http.post(
      `${this.apiUrl}/register`,
      userData
    );
  }

  login(userData: any) {

    return this.http.post(
      `${this.apiUrl}/login`,
      userData
    );
  }
}