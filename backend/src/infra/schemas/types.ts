import { ZodArray, ZodSchema, ZodTypeDef } from 'zod';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type DeepRaw<T> = {
  [K in keyof T]: T[K] extends object ? DeepRaw<T[K]> : unknown;
};

export type Schema<O = any, I = O> = ZodSchema<
  DeepPartial<O>,
  ZodTypeDef,
  DeepRaw<DeepPartial<I>>
>;

export type ArraySchema<T = any> = ZodArray<Schema<T>>;
