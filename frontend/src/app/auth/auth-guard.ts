import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


// ===============================
// LOGIN CHECK
// ===============================

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (token) {
    return true;
  }

  return router.createUrlTree(['/login']);
};


// ===============================
// ADMIN CHECK
// ===============================

export const adminGuard: CanActivateFn = () => {

  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (!token) {
    return router.createUrlTree(['/login']);
  }

  const user = localStorage.getItem('user');

  if (!user) {
    return router.createUrlTree(['/login']);
  }

  try {

    const userData = JSON.parse(user);

    if (userData.role === 'admin') {
      return true;
    }

  } catch (error) {
    console.error('Invalid user data');
  }

  return router.createUrlTree(['/menu']);
};


// ===============================
// STAFF CHECK
// ===============================

export const staffGuard: CanActivateFn = () => {

  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (!token) {
    return router.createUrlTree(['/login']);
  }

  const user = localStorage.getItem('user');

  if (!user) {
    return router.createUrlTree(['/login']);
  }

  try {

    const userData = JSON.parse(user);

    if (userData.role === 'staff') {
      return true;
    }

  } catch (error) {
    console.error('Invalid user data');
  }

  return router.createUrlTree(['/menu']);
};