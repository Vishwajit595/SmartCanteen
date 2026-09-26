import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-staff-dashboard',
  imports: [],
  templateUrl: './staff-dashboard.html',
  styleUrl: './staff-dashboard.css'
})
export class StaffDashboard implements OnInit {

  orders: any[] = [];

  private apiUrl =
    'https://smartcanteen-c012.onrender.com/api/orders';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {

    this.http.get<any[]>(
      this.apiUrl
    ).subscribe({

      next: (data) => {

        console.log(
          'ORDERS:',
          data
        );

        this.orders = data;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'ORDER ERROR:',
          error
        );

      }

    });
  }

  updateStatus(
    id: string,
    status: string
  ) {

    this.http.put(
      `${this.apiUrl}/${id}/status`,
      { status }
    ).subscribe({

      next: () => {

        alert(
          `Order ${status}`
        );

        this.loadOrders();
      },

      error: (error) => {

        console.error(
          'STATUS ERROR:',
          error
        );

        alert(
          'Failed to update order status'
        );
      }

    });
  }

}