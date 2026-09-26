import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verify-email',
  imports: [],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css'
})
export class VerifyEmail implements OnInit {

  message = 'Verifying your email...';
  success = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {

    const token =
      this.route.snapshot.queryParamMap.get('token');

    if (!token) {

      this.message =
        'Invalid verification link.';

      return;
    }

    this.http.get(
      `http://localhost:5000/api/auth/verify-email?token=${token}`
    )
    .subscribe({

      next: (response: any) => {

        this.success = true;

        this.message =
          'Email verified successfully! Redirecting to login...';

        setTimeout(() => {

          this.router.navigate(['/login']);

        }, 3000);
      },

      error: (error) => {

        this.success = false;

        this.message =
          error.error?.message ||
          'Email verification failed.';
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}