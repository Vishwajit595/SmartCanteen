import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route) => {

  const router = inject(Router);

  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');

  if (!token || !userData) {
    alert('Please login first.');
    router.navigate(['/login']);
    return false;
  }

  const user = JSON.parse(userData);

  const isStaffRoute =
    route.routeConfig?.path === 'staff-dashboard';

  if (isStaffRoute) {

    if (user.role !== 'staff' && user.role !== 'admin') {
      alert('Access denied. Staff only.');
      router.navigate(['/menu']);
      return false;
    }

  }

  return true;
};