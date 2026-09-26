import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = 'https://smartcanteen-c012.onrender.com/api/menu';

  constructor(private http: HttpClient) {}

  getMenuItems() {
    return this.http.get<any[]>(this.apiUrl);
  }
}