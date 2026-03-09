export interface SidebarItem {
    id: number
    label: string
    icon: string
    route?: string
}

export const SIDEBAR_MENUS: SidebarItem[] = [
    {
        id: 1,
        label: 'Home',
        icon: 'home',
        route: '/home'
    },
    {
        id: 2,
        label: 'Orders',
        icon: 'product',
        route: '/dashboard/orders/list'
    },
    // {
    //     id: 3,
    //     label: 'Create Order',
    //     icon: 'plus-circle',
    //     route: '/dashboard/orders/new'
    // },
    {
        id: 4,
        label: 'Drivers',
        icon: 'usergroup-add',
        route: '/dashboard/drivers'
    },
    {
        id: 5,
        label: 'Logout',
        icon: 'logout',
    }
]