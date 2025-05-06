import { BaseCommand } from '../../../infra';
import { FindOneOptions } from 'typeorm';
import { Order, OrderRepository } from '../adapters';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetOrderCommand extends BaseCommand<
  GetOrderCommand.Input,
  GetOrderCommand.Output
> {
  constructor(private readonly orderRepository: OrderRepository) {
    super();
  }

  protected async doWork(
    input: GetOrderCommand.Input,
  ): Promise<GetOrderCommand.Output> {
    return this.orderRepository.findOneOrFail({ where: input });
  }
}

export namespace GetOrderCommand {
  export type Input = FindOneOptions<Pick<Order, 'id' | 'publicId'>>['where'];

  export type Output = Order | null;
}
