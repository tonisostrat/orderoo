import { BaseCommand } from '../../../infra';
import * as dayjs from 'dayjs';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { Decimal } from 'decimal.js';
import { Order, OrderRepository } from '../adapters';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateOrderCommand extends BaseCommand<
  CreateOrderCommand.Input,
  CreateOrderCommand.Output
> {
  constructor(private readonly orderRepository: OrderRepository) {
    super(
      z.strictObject({
        externalId: z.string().nonempty(),
        amount: z.custom<Decimal>((raw) => Decimal.isDecimal(raw)),
        currency: z.string().nonempty(),
        dueDate: z.custom<dayjs.Dayjs>((raw) => dayjs.isDayjs(raw)),
        description: z.string().optional(),
        street: z.string().nonempty(),
        town: z.string().nonempty(),
        country: z.string().nonempty(),
      }),
    );
  }

  protected async doWork(
    input: CreateOrderCommand.Input,
  ): Promise<CreateOrderCommand.Output> {
    const order = this.orderRepository.create({
      ...input,
      publicId: randomUUID(),
    });

    this.logger.log('Saving Order', order);

    return this.orderRepository.save(order);
  }
}

export namespace CreateOrderCommand {
  export type Input = Omit<
    Order,
    'id' | 'publicId' | 'createDate' | 'updateDate' | 'deleteDate'
  >;

  export type Output = Order;
}
