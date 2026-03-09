import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { OrderListService } from '../service/order-list.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { StatusColorPipe } from '../../../../../../core/pipe/order-list-status.pipe';
import { listOfColumnModel, Order } from '../../orders.model';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzInputDirective, NzInputWrapperComponent } from "ng-zorro-antd/input";
import { FormsModule } from '@angular/forms';
import { NzInputModule, NzInputSearchEvent } from 'ng-zorro-antd/input';
import { DebounceInputDirective } from "../../../../../../core/directive/debounce-input";
import { OrderFormModalComponent } from '../form/list-form-modal';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { AlertService } from '../../../../../../core/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  imports: [NzTabsModule, NzButtonModule, NzTableModule, CommonModule, NzIconModule, NzTagModule, StatusColorPipe, NzInputDirective, NzInputWrapperComponent, NzInputModule, FormsModule, DebounceInputDirective, NzModalModule],
  templateUrl: './order-list.html',
  styles: ``,
})
export class OrderList implements OnInit {

  private orderListService = inject(OrderListService);
  private destroyRef = inject(DestroyRef);
  private orders = signal<Order[]>([]);
  private activeTab = signal<string>('all');
  private modal = inject(NzModalService);
  private alertService = inject(AlertService);
  private router = inject(Router);
  listOfColumn: listOfColumnModel[] = [
    {
      title: 'ID',
      priority: false,
      width: '80px',
    },
    {
      title: 'Cargo Type',
      priority: 2
    },
    {
      title: 'From',
      priority: 3
    },
    {
      title: 'To',
      priority: 2
    },
    {
      title: 'Status',
      priority: 1
    },
    {
      title: 'Weight',
      priority: 1
    },
    {
      title: 'Price',
      priority: 1
    },
    {
      title: 'Action',
      priority: 1
    }
  ];


  ngOnInit(): void {
    this.loadAllOrders()
  }

  loadAllOrders() {
    this.orderListService.query().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.orders.set(res);
      }
    })
  }

  filteredOrders = computed(() => {
    if (this.activeTab() === 'all') {
      return this.orders();
    }
    return this.orders().filter((order) => order.status === this.activeTab());
  });

  onTabChange(index: number) {
    const statusMap = [
      'all',
      'new',
      'in_transit',
      'delivered',
      'cancelled'
    ];

    this.activeTab.set(statusMap[index]);
  }


  search(searchText: string): void {
    this.orderListService.query().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (res) => {
        const filtered = res.filter(order => order.cargoType.toLowerCase().includes(searchText.toLowerCase()));
        this.orders.set(filtered);
      }
    })
  }

  openCreateModal() {
    const modal = this.modal.create({
      nzTitle: 'Create Transport Order',
      nzContent: OrderFormModalComponent,
      nzFooter: null,
      nzWidth: 700
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        this.orderListService.create(result).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: (res) => {
            this.orders.update(order => [...order, res]);
            this.alertService.createMessage('success', 'Order created')
          }
        });
      }
    });
  }

  openEditModal(order: Order) {
    const modal = this.modal.create({
      nzTitle: 'Edit Transport Order',
      nzContent: OrderFormModalComponent,
      nzFooter: null,
      nzWidth: 700,
      nzData: order
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        this.orderListService.update(result).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: (res) => {
            this.orders.update(order => order.map(o => o.id === res.id ? res : o));
            this.alertService.createMessage('success', 'Order updated')

          }
        })
      }
    });
  }

  confirmDelete(order: Order) {
  this.modal.confirm({
    nzTitle: 'Delete Transport Order',
    nzContent: `Are you sure you want to delete order #${order.id}?`,
    nzOkText: 'Delete',
    nzOkDanger: true,
    nzCancelText: 'Cancel',
    nzOnOk: () => this.delete(order.id!)
  });
}

  delete(id: number) {
    this.orderListService.delete(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.orders.update(order => order.filter(o => o.id !== id));
        this.alertService.createMessage('success' , 'Order deleted')
      }
    })
  }

  opdenOrderDetail(id:number){
    this.router.navigate(['/dashboard/orders' , id])
  }
}
