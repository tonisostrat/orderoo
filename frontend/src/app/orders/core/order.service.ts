import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments';
import { BehaviorSubject, tap } from 'rxjs';
import { Filter, Order } from './order.types';

@Injectable({ providedIn: 'root' })
export class OrderService {
  public readonly listSubject: BehaviorSubject<Order[]> = new BehaviorSubject<
    Order[]
  >([]);

  constructor(private readonly http: HttpClient) {}

  listOrders(rawFilter: Filter): void {
    const filter = this.buildFilter(rawFilter);

    this.http
      .get<
        Order[]
      >(`${environment.apiUrl}/orders`, { params: { filter: JSON.stringify(filter) } })
      .subscribe((data) => {
        this.listSubject.next(data);
      });
  }

  addOrder(order: Omit<Order, 'id'>) {
    return this.http.post<Order>(`${environment.apiUrl}/orders`, order).pipe(
      tap((data) => {
        this.listSubject.next([...this.listSubject.value, data]);
      }),
    );
  }

  private buildFilter(rawFilter: Filter): Filter {
    if (typeof rawFilter.description === 'string') {
      return {
        ...rawFilter,
        description: {
          op: 'ilike',
          val: `%${rawFilter.description}%`,
        },
      };
    }

    return rawFilter;
  }
}
