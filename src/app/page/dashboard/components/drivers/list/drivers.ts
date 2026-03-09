import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { DriverService } from '../service/driver.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Driver } from '../model/drivers.model';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { StatusColorPipe } from '../../../../../shared/components/pipe/status-color.pipe';

@Component({
  selector: 'app-drivers',
  imports: [NzDividerModule, NzTableModule, NzTagComponent, StatusColorPipe],
  templateUrl: './drivers.html',
  styles: ``,
})
export class Drivers implements OnInit {
  private driverService = inject(DriverService);
  private destroyRef = inject(DestroyRef);

  driverList = signal<Driver[]>([]);
  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers() {
    this.driverService
      .query()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.driverList.set(res);
        },
      });
  }
}
