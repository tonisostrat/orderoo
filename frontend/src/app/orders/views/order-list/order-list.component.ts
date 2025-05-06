import { Component, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { OrderService } from '../../core/order.service';
import { Filter, Order } from '../../core/order.types';
import { DatePipe } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CountryService } from '../../../shared/countries/country.service';
import { Country } from '../../../shared/countries/country.types';
import { Select } from 'primeng/select';
import { Store } from '../../../infra/store';
import { CountriesToOptionsPipe } from '../../../infra/pipes/countries-to-options.pipe';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-order-list',
  imports: [
    ButtonModule,
    SidebarModule,
    RouterOutlet,
    TableModule,
    RouterLink,
    DatePipe,
    InputText,
    FormsModule,
    Select,
    CountriesToOptionsPipe,
    Tooltip,
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent implements OnInit {
  protected readonly store: {
    orders: Store.Entry<Order[]>;
    countries: Store.Entry<Country[]>;
  } = {
    orders: {
      loading: true,
      value: [],
    },
    countries: {
      loading: true,
      value: [],
    },
  };

  protected readonly filter: Filter = {};

  private readonly preferredCountry = new RegExp(/Estonia/i);

  constructor(
    private readonly orderService: OrderService,
    private readonly countryService: CountryService,
  ) {}

  load() {
    this.orderService.listOrders(this.filter);
  }

  applyFilter() {
    this.load();
  }

  clearFilter(key: keyof Filter) {
    delete this.filter[key];

    this.load();
  }

  sort(orders: Order[]) {
    const sortByDate = (array: Order[]) =>
      array.sort((a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate));

    const { preferred, rest } = orders.reduce<
      Record<'preferred' | 'rest', Order[]>
    >(
      (acc, order) => {
        if (this.preferredCountry.test(order.country)) {
          acc.preferred.push(order);
        } else {
          acc.rest.push(order);
        }

        return acc;
      },
      {
        preferred: [],
        rest: [],
      },
    );

    return [...sortByDate(preferred), ...sortByDate(rest)];
  }

  copyId(id: string): void {
    navigator.clipboard.writeText(id);
  }

  ngOnInit(): void {
    this.orderService.listSubject.subscribe((data) => {
      this.store.orders.loading = false;
      this.store.orders.value = this.sort(data);
    });

    this.countryService.listCountries().subscribe((data) => {
      this.store.countries.loading = false;
      this.store.countries.value = data;
    });

    this.load();
  }
}
