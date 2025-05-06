import { BaseCommand } from '../../../infra';
import { Currency, CurrencyRepository } from '../adapters';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListCurrenciesCommand extends BaseCommand<
  ListCurrenciesCommand.Input,
  ListCurrenciesCommand.Output
> {
  constructor(private readonly currencyRepository: CurrencyRepository) {
    super();
  }

  protected async doWork(): Promise<ListCurrenciesCommand.Output> {
    return this.currencyRepository
      .getAll()
      .then((currencies) =>
        Object.values(currencies).map((currency) => currency.code),
      );
  }
}

export namespace ListCurrenciesCommand {
  export type Input = void;

  export type Output = Currency['code'][];
}
