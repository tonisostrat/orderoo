import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../core/order.service';
import { Location, NgIf } from '@angular/common';
import { Drawer } from 'primeng/drawer';
import { Router } from '@angular/router';
import { IftaLabel } from 'primeng/iftalabel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { DatePicker } from 'primeng/datepicker';
import { Store } from '../../../infra/store';
import { Order } from '../../core/order.types';
import { Country } from '../../../shared/countries/country.types';
import { Currency } from '../../../shared/currencies/currency.types';
import { CountriesToOptionsPipe } from '../../../infra/pipes/countries-to-options.pipe';
import { CountryService } from '../../../shared/countries/country.service';
import { CurrencyService } from '../../../shared/currencies/currency.service';
import { Button } from 'primeng/button';
import { OrderData } from './order-details.types';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-order-details',
  imports: [
    Drawer,
    IftaLabel,
    ReactiveFormsModule,
    InputText,
    InputNumber,
    Select,
    Textarea,
    DatePicker,
    CountriesToOptionsPipe,
    Button,
    FormsModule,
    MessagesModule,
    Message,
    NgIf,
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent implements OnInit {
  protected readonly store: {
    currencies: Store.Entry<Currency[]>;
    countries: Store.Entry<Country[]>;
    newOrder: Store.Entry<Partial<OrderData>>;
    orderSaveError?: string;
  } = {
    currencies: {
      loading: true,
      value: [],
    },
    countries: {
      loading: true,
      value: [],
    },
    newOrder: {
      loading: false,
      value: {},
    },
  };

  constructor(
    private readonly orderService: OrderService,
    private readonly countryService: CountryService,
    private readonly currencyService: CurrencyService,
    private readonly location: Location,
    private readonly router: Router,
  ) {}

  title(): string {
    const path = this.location.path().split('/').pop()!;

    switch (path) {
      case 'new': {
        return 'Create new Order';
      }
      default: {
        return path;
      }
    }
  }

  handleSave() {
    const order = {
      ...this.store.newOrder.value,
      dueDate: this.store.newOrder.value.dueDate?.toISOString(),
    };

    this.orderService.addOrder(order as Order).subscribe({
      next: () => {
        this.store.orderSaveError = undefined;
        this.handleClose();
      },
      error: (error) => {
        switch (error.status as number) {
          case 400: {
            this.store.orderSaveError =
              'Order contains missing or invalid data';
            return;
          }
          case 409: {
            this.store.orderSaveError = 'Order with this number already exists';
            return;
          }
          default: {
            this.store.orderSaveError = 'Failed to save Order';
          }
        }
      },
    });
  }

  handleClose() {
    this.router.navigateByUrl('/orders', { replaceUrl: true });
  }

  ngOnInit() {
    this.countryService.listCountries().subscribe((data) => {
      this.store.countries.loading = false;
      this.store.countries.value = data;
    });

    this.currencyService.listCurrencies().subscribe((data) => {
      this.store.currencies.loading = false;
      this.store.currencies.value = data;
    });
  }
}
