import { Routes } from '@angular/router';
import { DashboardRoutes } from './page/dashboard/dashboard.routes';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./page/dashboard/dashboard').then((m) => m.Dashboard),
    children: DashboardRoutes,
  },
  {
    path: 'login',
    canActivate: [noAuthGuard],
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: '**',
    redirectTo: 'dashboard/home',
  },
];
