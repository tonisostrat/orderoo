import { SomeZodObject, z, ZodType } from 'zod';
import { FindOperator, ILike } from 'typeorm';

export const filterSchema = (schema: SomeZodObject) =>
  z.union([schema, z.array(schema)]);

export const fieldFilterSchema = (plainSchema: ZodType) =>
  z.union([
    plainSchema,
    z.custom<FindOperator<unknown>>((raw) => raw instanceof FindOperator),
    z
      .strictObject({
        op: z.enum(['ilike']),
        val: plainSchema,
      })
      .transform(({ op, val }) => {
        switch (op) {
          case 'ilike': {
            return ILike(val);
          }
        }
      }),
  ]);
