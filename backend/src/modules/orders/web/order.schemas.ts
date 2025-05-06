import { CreateOrderCommand } from '../core';
import { z } from 'zod';
import { Decimal } from 'decimal.js';
import * as dayjs from 'dayjs';
import { omit } from 'lodash';
import { ArraySchema, Schema } from '../../../infra/schemas';

export const createOrderSchema: Schema<CreateOrderCommand.Input> = z
  .object({
    amount: z.number().transform<Decimal>((raw) => Decimal(raw)),
    dueDate: z
      .string()
      .datetime()
      .transform<dayjs.Dayjs>((raw) => dayjs(raw)),
  })
  .passthrough();

export const orderSchema: Schema = z
  .object({
    amount: z.custom<Decimal>().transform((raw) => raw.toNumber()),
  })
  .passthrough()
  .transform((source) => {
    const { publicId, ...rest } = source;

    return {
      id: String(publicId),
      ...omit(rest, 'id', 'createDate', 'updateDate', 'deleteDate'),
    };
  });

export const listOrderSchema: ArraySchema = z.array(orderSchema);
