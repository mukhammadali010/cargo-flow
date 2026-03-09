import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../../../page/dashboard/components/orders/orders.model';
import { DriverStatus } from '../../../page/dashboard/components/drivers/model/drivers.model';

@Pipe({
  name: 'statusColor',
})
export class StatusColorPipe implements PipeTransform {
  transform(status: OrderStatus | DriverStatus): string {
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
      case DriverStatus.AVAILABLE:
        return 'green';
      case DriverStatus.BUSY:
        return 'processing';
      case DriverStatus.OFFLINE:
        return 'red';
      default:
        return 'default';
    }
  }
}
