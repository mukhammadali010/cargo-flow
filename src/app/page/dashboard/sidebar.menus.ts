export interface SidebarItem {
  id: number;
  label: string;
  icon: string;
  route?: string;
  roles: string[];
}

export const SIDEBAR_MENUS: SidebarItem[] = [
  {
    id: 1,
    label: 'Home',
    icon: 'home',
    route: '/home',
    roles: ['MODERATOR', 'SENDER', 'CARRIER'],
  },
  {
    id: 2,
    label: 'Orders',
    icon: 'product',
    route: '/dashboard/orders/list',
    roles: ['MODERATOR', 'SENDER', 'CARRIER'],
  },
  {
    id: 3,
    label: 'Users',
    icon: 'usergroup-add',
    route: '/dashboard/users',
    roles: ['MODERATOR'],
  },
  {
    id: 4,
    label: 'Drivers',
    icon: 'truck',
    route: '/dashboard/drivers',
    roles: ['MODERATOR', 'SENDER'],
  },
  {
    id: 5,
    label: 'Logout',
    icon: 'logout',
    route: '/login',
    roles: ['MODERATOR', 'SENDER', 'CARRIER'],
  },
];
