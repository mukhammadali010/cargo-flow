import { Injectable } from '@angular/core';
import { BaseEntityService } from '../../../../../../core/base/base-entity.service';
import { Order } from '../../orders.model';

@Injectable({
  providedIn: 'root',
})
export class OrderListService extends BaseEntityService<Order> {
  constructor() {
    super(`http://localhost:3000/orders`);
  }

  getIdentity(order: Order) {
    return order.id;
  }
}
