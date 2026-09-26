import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name = '';
  email = '';
  password = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  register() {

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password
    };


    this.auth.register(userData).subscribe({

      next: (response) => {

        console.log(
          'Registration successful:',
          response
        );

        alert(
          'Registration successful! Please check your email and click the verification link before logging in.'
        );

        this.router.navigate(['/login']);

      },


      error: (error) => {

        console.error(
          'Registration failed:',
          error
        );

        alert(
          error.error?.message ||
          'Registration failed'
        );

      }

    });

  }

}