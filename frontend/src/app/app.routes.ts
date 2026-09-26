import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Menu } from './menu/menu';
import { Cart } from './cart/cart';
import { StaffDashboard } from './staff-dashboard/staff-dashboard';
import { MyOrders } from './my-orders/my-orders';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { VerifyEmail } from './verify-email/verify-email';

import {
  authGuard,
  adminGuard,
  staffGuard
} from './auth/auth-guard';


export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'verify-email',
    component: VerifyEmail
  },

  {
    path: 'menu',
    component: Menu,
    canActivate: [authGuard]
  },

  {
    path: 'cart',
    component: Cart,
    canActivate: [authGuard]
  },

  {
    path: 'my-orders',
    component: MyOrders,
    canActivate: [authGuard]
  },

  {
    path: 'staff-dashboard',
    component: StaffDashboard,
    canActivate: [staffGuard]
  },

  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    canActivate: [adminGuard]
  }

];