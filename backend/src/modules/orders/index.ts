import { Module } from '@nestjs/common';
import { OrderController } from './web/order.controller';
import { CreateOrderCommand, GetOrderCommand, ListOrdersCommand } from './core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, OrderRepository } from './adapters';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    CreateOrderCommand,
    GetOrderCommand,
    ListOrdersCommand,
    OrderRepository,
  ],
})
export class OrdersModule {}
