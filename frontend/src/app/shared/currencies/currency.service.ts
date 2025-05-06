import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency } from './currency.types';
import { of } from 'rxjs';
import { environment } from '../../../environments';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  private readonly cache: Currency[] = [];

  constructor(private readonly http: HttpClient) {}

  listCurrencies() {
    if (this.cache.length) {
      return of(this.cache);
    }

    return this.http.get<Currency[]>(`${environment.apiUrl}/currencies`);
  }
}
