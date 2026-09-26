import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  imports: [FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {

  name = '';
  email = '';
  password = '';

  private apiUrl =
    'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  createStaff() {

    const token = localStorage.getItem('token');

    const staffData = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.http.post(
      `${this.apiUrl}/create-staff`,
      staffData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({

      next: (response: any) => {

        alert('Staff account created successfully!');

        this.name = '';
        this.email = '';
        this.password = '';

        console.log('Staff created:', response);
      },

      error: (error) => {

        console.error('Staff creation failed:', error);

        alert(
          error.error?.message ||
          'Staff creation failed'
        );
      }

    });
  }
}