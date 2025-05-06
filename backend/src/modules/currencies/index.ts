import { Module } from '@nestjs/common';
import { ListCurrenciesCommand } from './core';
import { CurrencyController } from './web/currency.controller';
import { CurrencyRepository } from './adapters';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyRepository, ListCurrenciesCommand],
})
export class CurrenciesModule {}
