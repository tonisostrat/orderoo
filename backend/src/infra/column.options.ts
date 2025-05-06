import { ColumnOptions } from 'typeorm';
import * as dayjs from 'dayjs';
import { Decimal } from 'decimal.js';

export const dateColumnOptions: ColumnOptions = {
  type: 'timestamp with time zone',
  transformer: {
    from: (raw?: string) => dayjs(raw),
    to: (raw?: dayjs.Dayjs) => raw?.toISOString(),
  },
};

export const numberColumnOptions: ColumnOptions = {
  type: 'numeric',
  transformer: {
    from: (raw?: string) => (raw ? Decimal(raw) : undefined),
    to: (raw?: Decimal) => raw?.toNumber(),
  },
};
