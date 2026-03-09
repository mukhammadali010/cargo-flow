import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { OrderListService } from '../../order-list/service/order-list.service';
import { Order } from '../../orders.model';

export const orderResolver: ResolveFn<Order | null> = (route) => {
  const orderService = inject(OrderListService);
  const router = inject(Router);

  const id = route.paramMap.get('id');

  return orderService.find(id!).pipe(
    catchError(() => {
      router.navigate(['/dashboard/orders/list']);
      return of(null);
    }),
  );
};
