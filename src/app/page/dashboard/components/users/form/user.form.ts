import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { User } from '../../../../../features/auth/login/login.model';
import { NgxMaskDirective } from 'ngx-mask';
import { UserRoles } from '../model/user-role.model';

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
    NgxMaskDirective,
  ],
  templateUrl: './user-form.html',
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private modalRef = inject(NzModalRef<UserFormComponent>);
  private data = inject(NZ_MODAL_DATA, { optional: true }) as User | null;
  isEdit = !!this.data;
  isVisible = false;
  usersList = signal<User[]>([]);

  roles = [
    { label: 'Admin', value: UserRoles.MODERATOR },
    { label: 'Sender', value: UserRoles.SENDER },
    { label: 'Carrier', value: UserRoles.CARRIER },
  ];

  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    password: ['', [Validators.required]],
    role: ['', [Validators.required]],
  });

  ngOnInit(): void {
    if (this.data) {
      this.userForm.patchValue({
        name: this.data.name,
        phone: this.data.phone,
        role: this.data.role,
      });
    }
  }
  submit() {
    if (this.userForm.invalid) {
      this.markFormDirty();
      return;
    }

    const user: User = {
      ...this.userForm.value,
    } as User;

    if (this.isEdit) {
      user.id = this.data!.id;
    }

    this.modalRef.close(user);
  }

  close() {
    this.modalRef.close();
  }

  private markFormDirty(): void {
    Object.values(this.userForm.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity();
      }
    });
  }
}
