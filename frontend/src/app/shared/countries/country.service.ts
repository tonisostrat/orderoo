import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from './country.types';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly cache: Country[] = [];

  constructor(private readonly http: HttpClient) {}

  listCountries() {
    if (this.cache.length) {
      return of(this.cache);
    }

    return this.http.get<Country[]>('https://restcountries.com/v3.1/all', {
      params: { fields: ['name'].join(',') },
    });
  }
}
