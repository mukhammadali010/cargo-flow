import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../../page/dashboard/components/orders/orders.model';

@Pipe({
  name: 'statusColor',
})
export class StatusColorPipe implements PipeTransform {
  transform(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.ACTIVE:
        return 'green';
      case OrderStatus.NEW:
        return 'blue';
      case OrderStatus.CANCELLED:
        return 'red';
      case OrderStatus.DELIVERED:
        return 'success';
      case OrderStatus.IN_TRANSIT:
        return 'processing';
      case OrderStatus.MODERATION:
        return 'gold';
      case OrderStatus.REJECTED:
        return 'volcano';

      default:
        return 'default';
    }
  }
}
