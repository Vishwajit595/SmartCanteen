import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = 'http://localhost:5000/api/menu';

  constructor(private http: HttpClient) {}

  getMenuItems() {
    return this.http.get<any[]>(this.apiUrl);
  }
}