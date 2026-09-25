import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-my-orders',
  imports: [DatePipe, Navbar],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css'
})
export class MyOrders implements OnInit {

  orders: any[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMyOrders();
  }

  loadMyOrders() {

    const user = JSON.parse(
      localStorage.getItem('user') || '{}'
    );

    this.http.get<any[]>(
      'http://localhost:5000/api/orders'
    ).subscribe({

      next: (data) => {

        this.orders = data.filter(
          order => order.user?._id === user.id
        );

        console.log('MY ORDERS:', this.orders);

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('MY ORDERS ERROR:', error);
      }

    });
  }
}