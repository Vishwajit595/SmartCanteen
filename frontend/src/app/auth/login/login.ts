import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  login() {

    const userData = {
      email: this.email,
      password: this.password
    };

    this.auth.login(userData).subscribe({

      next: (response: any) => {

        console.log('Login successful:', response);

        localStorage.setItem('token', response.token);

        localStorage.setItem(
          'user',
          JSON.stringify(response.user)
        );

        alert('Login successful!');

        this.router.navigate(['/menu']);
      },

      error: (error) => {

        console.error('Login failed:', error);

        alert(
          error.error?.message || 'Login failed'
        );
      }

    });
  }
}