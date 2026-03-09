import { Component, inject, signal } from '@angular/core';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { SIDEBAR_MENUS, SidebarItem } from './sidebar.menus';
import { AuthService } from '../../features/auth/auth.service';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-dashboard',
  imports: [NzBreadCrumbModule, NzIconModule, NzMenuModule, NzLayoutModule, RouterLink, RouterOutlet, NzAvatarModule, NzDropdownModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  authService = inject(AuthService);
  router = inject(Router);
  sidebarMenus = signal<SidebarItem[]>(SIDEBAR_MENUS);
  isCollapsed = false;
  protected readonly date = new Date();
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  getAvatar() {
    const role = this.authService.user()?.role;

    if (role === 'MODERATOR') return 'images/admin.webp';
    if (role === 'CARRIER') return 'images/cashier.webp';
    if (role === 'SENDER') return 'images/manager.webp';

    return 'images/admin.webp';
  }
}
