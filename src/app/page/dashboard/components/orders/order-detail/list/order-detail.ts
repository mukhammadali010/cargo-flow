import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { OrderListService } from '../../order-list/service/order-list.service';
import { Order, STATUS_TRANSITIONS } from '../../orders.model';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { DatePipe, DecimalPipe } from '@angular/common';
import { StatusColorPipe } from '../../../../../../core/pipe/order-list-status.pipe';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../../../../../../features/auth/auth.service';


@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [NzTagModule, NzTimelineModule, DecimalPipe, DatePipe, NzModalModule, StatusColorPipe, NzSelectModule, NzButtonModule],
  templateUrl: './order-detail.html'
})
export class OrderDetail {

  private route = inject(ActivatedRoute);
  private modal = inject(NzModalService);
  private orderService = inject(OrderListService);
  private authService = inject(AuthService);

  orderDetails = signal<Order>(this.route.snapshot.data['order']);

  availableStatuses = computed(() => {
    return STATUS_TRANSITIONS[this.orderDetails().status];
  });

  changeStatus(newStatus: any) {
    this.modal.confirm({
      nzTitle: 'Change Order Status',
      nzContent: `Change status to ${newStatus}?`,
      nzOnOk: () => {
        const current = this.orderDetails();
        const updated: Order = {
          ...current,
          status: newStatus,
          statusHistory: [...(current.statusHistory ?? []),
            {
              from: current.status,
              to: newStatus,
              date: new Date().toISOString(),
              changedAt: new Date().toISOString(),
              changedBy: this.authService.user()?.name || "system"
            }

          ]

        };
        this.orderService.update(updated).subscribe(res => {
          this.orderDetails.set(res);
        });

      }

    });

  }

}