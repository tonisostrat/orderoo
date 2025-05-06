import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as dayjs from 'dayjs';
import { dateColumnOptions, numberColumnOptions } from '../../../infra';
import { Decimal } from 'decimal.js';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  publicId: string;

  @Column()
  externalId: string;

  @Column(numberColumnOptions)
  amount: Decimal;

  @Column()
  currency: string;

  @Column(dateColumnOptions)
  dueDate: dayjs.Dayjs;

  @Column({ type: 'text' })
  description?: string | null;

  @Column()
  street: string;

  @Column()
  town: string;

  @Column()
  country: string;

  @CreateDateColumn(dateColumnOptions)
  createDate: dayjs.Dayjs;

  @UpdateDateColumn(dateColumnOptions)
  updateDate: dayjs.Dayjs;

  @DeleteDateColumn(dateColumnOptions)
  deleteDate: dayjs.Dayjs;
}
