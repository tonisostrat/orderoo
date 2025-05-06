import { Routes } from '@angular/router';
import { OrderListComponent } from './orders/views/order-list/order-list.component';
import { OrderDetailsComponent } from './orders/views/order-details/order-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full',
  },
  {
    path: 'orders',
    component: OrderListComponent,
    children: [
      {
        path: ':id',
        component: OrderDetailsComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'orders',
  },
];
