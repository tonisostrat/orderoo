import { Order } from '../../core/order.types';

export type OrderData = Omit<Order, 'id' | 'dueDate'> & { dueDate: Date };
