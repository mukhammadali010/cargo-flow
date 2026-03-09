import { Routes } from "@angular/router";
import { orderResolver } from "./order-detail/resolver/order-resolver";

export const ORDER_ROUTES: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./order-list/list/order-list').then(m => m.OrderList)
    },
    {
        path: ':id',
        loadComponent: () => import('./order-detail/list/order-detail').then(m => m.OrderDetail),
        resolve: {
            order: orderResolver
        }
    }
]