import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';

export const noAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    return router.navigate(['/users']);
  }

  return true;
};
