import { DataSource, Repository } from 'typeorm';
import { Order } from './order.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }
}
