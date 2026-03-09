import { Routes } from '@angular/router';

export const DashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home').then((m) => m.Home),
  },
  {
    path: 'orders',
    loadChildren: () => import('./components/orders/orders.routes').then((m) => m.ORDER_ROUTES),
  },
  {
    path: 'users',
    loadComponent: () => import('./components/users/list/users').then((m) => m.Users),
  },
  {
    path: 'drivers',
    loadComponent: () => import('./components/drivers/list/drivers').then((m) => m.Drivers),
  },
];
