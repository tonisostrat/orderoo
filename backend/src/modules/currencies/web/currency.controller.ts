import { Controller, Get } from '@nestjs/common';
import { ListCurrenciesCommand } from '../core';

const BASE_PATH = 'currencies';

@Controller(BASE_PATH)
export class CurrencyController {
  constructor(private readonly listCurrenciesCommand: ListCurrenciesCommand) {}

  @Get()
  async get(): Promise<ListCurrenciesCommand.Output> {
    return this.listCurrenciesCommand.execute();
  }
}
