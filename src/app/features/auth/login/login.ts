import { Component, DestroyRef, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgxMaskDirective } from 'ngx-mask';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(NonNullableFormBuilder);
  router = inject(Router);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  validateForm = this.fb.group({
    phone: this.fb.control('', [Validators.required, Validators.pattern(/^\d{9}$/)]),
    password: this.fb.control('', [Validators.required]),
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      const { phone, password } = this.validateForm.getRawValue();
      this.authService
        .login(phone, password)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/users');
          },
          error: () => {
            alert('Username yoki password notogri');
          },
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
