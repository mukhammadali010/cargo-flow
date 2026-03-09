import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { AuthService } from "../../features/auth/auth.service";
import { Router } from "@angular/router";
import { AlertService } from "../services/alert.service";


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const alertService = inject(AlertService);
    return next(req).pipe(
        catchError(err => {
            if (err.status === 401) {
                alertService.createMessage('error', 'Unauthorized');
                authService.logout();
                router.navigate(['/login']);
            }

            if (err.status === 403) {
                alertService.createMessage('error', 'Access Denied');
            }

            if (err.status === 500) {
                alertService.createMessage('error' ,'Server error');
            }

            return throwError(() => err)
        })
    )
}