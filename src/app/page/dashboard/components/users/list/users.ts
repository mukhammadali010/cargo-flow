import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../service/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { User } from '../../../../../features/auth/login/login.model';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputDirective, NzInputModule, NzInputWrapperComponent } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { DebounceInputDirective } from '../../../../../core/directive/debounce-input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { AlertService } from '../../../../../core/services/alert.service';
import { Router } from '@angular/router';
import { UserFormComponent } from '../form/user.form';

@Component({
  selector: 'app-users',
  imports: [
    NzDividerModule,
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzInputDirective,
    NzInputWrapperComponent,
    NzInputModule,
    FormsModule,
    DebounceInputDirective,
    NzModalModule,
  ],
  templateUrl: './users.html',
})
export class Users implements OnInit {
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);
  private modal = inject(NzModalService);
  private alertService = inject(AlertService);
  private router = inject(Router);
  userList = signal<User[]>([]);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService
      .query()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.userList.set(res);
        },
      });
  }

  search(searchText: string): void {
    this.userService
      .query()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          const filtered = res.filter((order) =>
            order.name.toLowerCase().includes(searchText.toLowerCase()),
          );
          this.userList.set(filtered);
        },
      });
  }

  openCreateModal() {
    const modal = this.modal.create({
      nzTitle: 'Create New User',
      nzContent: UserFormComponent,
      nzFooter: null,
      nzWidth: 700,
    });

    modal.afterClose.subscribe((result) => {
      if (result) {
        this.userService
          .create(result)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (res) => {
              this.userList.update((user) => [...user, res]);
              this.alertService.createMessage('success', 'User created');
            },
          });
      }
    });
  }

  openEditModal(user: User) {
    const modal = this.modal.create({
      nzTitle: 'Edit Transport Order',
      nzContent: UserFormComponent,
      nzFooter: null,
      nzWidth: 700,
      nzData: user,
    });

    modal.afterClose.subscribe((result) => {
      if (result) {
        this.userService
          .update(result)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (res) => {
              this.userList.update((order) => order.map((o) => (o.id === res.id ? res : o)));
              this.alertService.createMessage('success', 'User updated');
            },
          });
      }
    });
  }

  confirmDelete(user: User) {
    this.modal.confirm({
      nzTitle: 'Delete User',
      nzContent: `Are you sure you want to delete user #${user.id}?`,
      nzOkText: 'Delete',
      nzOkDanger: true,
      nzCancelText: 'Cancel',
      nzOnOk: () => this.delete(user.id!),
    });
  }

  delete(id: number) {
    this.userService
      .delete(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.userList.update((users) => users.filter((user) => user.id !== id));
          this.alertService.createMessage('success', 'User deleted');
        },
      });
  }
}
