import { Currency } from './currency.entity';

type CurrencyList = Record<string, Currency>;

export class CurrencyRepository {
  constructor(
    private readonly url = 'https://gist.githubusercontent.com/ksafranski/2973986/raw/',
  ) {}

  async getAll(): Promise<CurrencyList> {
    return fetch(this.url)
      .then((response) => response.json())
      .then((data) => data as CurrencyList);
  }
}
