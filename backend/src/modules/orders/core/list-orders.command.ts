import { BaseCommand, Optional } from '../../../infra';
import { Order, OrderRepository } from '../adapters';
import { Injectable } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { fieldFilterSchema, filterSchema } from '../../../infra/schemas';
import { z } from 'zod';

@Injectable()
export class ListOrdersCommand extends BaseCommand<
  ListOrdersCommand.Input,
  ListOrdersCommand.Output
> {
  constructor(private readonly orderRepository: OrderRepository) {
    super(
      filterSchema(
        z.strictObject({
          description: fieldFilterSchema(z.string()).optional(),
          country: z.string().optional(),
        }),
      ).optional(),
      true,
    );
  }

  protected async doWork(
    input: ListOrdersCommand.Input,
  ): Promise<ListOrdersCommand.Output> {
    return this.orderRepository.find({
      where: input,
    });
  }
}

export namespace ListOrdersCommand {
  export type Input = Optional<
    FindManyOptions<Pick<Order, 'description' | 'country'>>['where']
  >;

  export type Output = Order[];
}
