import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  CreateOrderCommand,
  GetOrderCommand,
  ListOrdersCommand,
} from '../core';
import {
  FilterQueryTransformer,
  AddLocation,
  Transform,
} from '../../../infra/transformers';
import {
  createOrderSchema,
  listOrderSchema,
  orderSchema,
} from './order.schemas';

const BASE_PATH = 'orders';

const ENTITY_PATH = ':id';

@Controller(BASE_PATH)
export class OrderController {
  constructor(
    private readonly createOrderCommand: CreateOrderCommand,
    private readonly getOrderCommand: GetOrderCommand,
    private readonly listOrdersCommand: ListOrdersCommand,
  ) {}

  @Get()
  @Transform({
    out: listOrderSchema,
  })
  async list(
    @FilterQueryTransformer()
    filter: ListOrdersCommand.Input,
  ): Promise<ListOrdersCommand.Output> {
    return this.listOrdersCommand.execute(filter);
  }

  @Get(ENTITY_PATH)
  @Transform({
    out: orderSchema,
  })
  async get(@Param('id') id: string): Promise<GetOrderCommand.Output> {
    return this.getOrderCommand.execute({ publicId: id });
  }

  @Post()
  @Transform({
    in: createOrderSchema,
    out: orderSchema,
  })
  @AddLocation('id', BASE_PATH)
  async create(
    @Body() body: CreateOrderCommand.Input,
  ): Promise<CreateOrderCommand.Output> {
    return this.createOrderCommand.execute(body);
  }
}
