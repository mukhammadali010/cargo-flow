import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Order } from '../../orders.model';

@Component({
  selector: 'app-order-form-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzFormModule,
    NzGridModule,
  ],
  templateUrl: './order-list-form.html',
})
export class OrderListFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private modalRef = inject(NzModalRef<OrderListFormComponent>);
  private data = inject(NZ_MODAL_DATA, { optional: true }) as Order | null;
  isVisible = false;
  isEdit = !!this.data;

  cargoTypes = [
    { label: 'General', value: 'general' },
    { label: 'Fragile', value: 'fragile' },
    { label: 'Perishable', value: 'perishable' },
    { label: 'Hazardous', value: 'hazardous' },
    { label: 'Oversized', value: 'oversized' },
  ];

  orderForm = this.fb.group({
    from: ['', [Validators.required, Validators.minLength(2)]],
    to: ['', [Validators.required, Validators.minLength(2)]],
    cargoType: ['', Validators.required],
    weight: [
      null as number | null,
      [Validators.required, Validators.min(1), Validators.max(40000)],
    ],
    price: [null as number | null, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    if (this.data) {
      this.orderForm.patchValue(this.data);
    }
  }

  submit() {
    if (this.orderForm.invalid) {
      this.markFormDirty();
      return;
    }

    const order: Order = {
      ...this.orderForm.value,
      status: 'new',
    } as Order;

    if (this.isEdit) {
      order.id = this.data!.id;
    }

    this.modalRef.close(order);
  }

  close() {
    this.modalRef.close();
  }

  private markFormDirty(): void {
    Object.values(this.orderForm.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity();
      }
    });
  }
}
