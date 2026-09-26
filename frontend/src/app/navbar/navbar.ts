import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(private router: Router) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get userRole(): string {
    const user = localStorage.getItem('user');

    if (!user) {
      return '';
    }

    try {
      return JSON.parse(user).role || '';
    } catch {
      return '';
    }
  }

  get isStudent(): boolean {
    return this.userRole === 'student';
  }

  get isStaff(): boolean {
    return this.userRole === 'staff';
  }

  get isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');

    alert('Logged out successfully!');

    this.router.navigate(['/login']);
  }
}