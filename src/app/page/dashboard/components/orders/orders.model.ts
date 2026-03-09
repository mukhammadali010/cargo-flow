export enum OrderStatus {
   NEW = 'new',
   MODERATION = 'moderation',
   ACTIVE = 'active',
   IN_TRANSIT = 'in_transit',
   DELIVERED = 'delivered',
   CANCELLED = 'cancelled',
   REJECTED = 'rejected'
}
export enum CargoType {
   GENERAL = 'general',
   FRAGILE = 'fragile',
   PERISHABLE = 'perishable',
   HAZARDOUS = 'hazardous',
   OVERSIZED = 'oversized'
}
export interface Order {
   id: number;
   from: string;
   to: string;
   cargoType: CargoType;
   weight: number;
   price: number;
   status: OrderStatus;
   createdAt: string;
   updatedAt: string;
   statusHistory: StatusChange[];
}
export interface StatusChange {
   from: OrderStatus | null;
   to: OrderStatus;
   date: string;
   changedAt: string;
   changedBy: string;
}
export interface PaginatedResponse<T> {
   data: T[];
   total: number;
   page: number;
   limit: number;
   totalPages: number;
}

export interface listOfColumnModel {
   title: string;
   priority: number | boolean;
   width?: string;
}
export interface StatusHistory {
   from: OrderStatus;
   to: OrderStatus;
   date: string;
   changedBy: string;
}

export const STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {

   [OrderStatus.NEW]: [
      OrderStatus.MODERATION,
      OrderStatus.CANCELLED
   ],

   [OrderStatus.MODERATION]: [
      OrderStatus.ACTIVE,
      OrderStatus.REJECTED
   ],

   [OrderStatus.ACTIVE]: [
      OrderStatus.IN_TRANSIT,
      OrderStatus.CANCELLED
   ],

   [OrderStatus.IN_TRANSIT]: [
      OrderStatus.DELIVERED,
      OrderStatus.CANCELLED
   ],

   [OrderStatus.DELIVERED]: [],

   [OrderStatus.REJECTED]: [],

   [OrderStatus.CANCELLED]: []

};