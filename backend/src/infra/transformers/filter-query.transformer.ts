import { ArgumentMetadata, BadRequestException, Query } from '@nestjs/common';
import { ZodSchema } from 'zod';

export const FilterQueryTransformer = (schema?: ZodSchema, key = 'filter') =>
  Query(key, {
    transform: (value: string | undefined, _: ArgumentMetadata): unknown => {
      if (!value) {
        return value;
      }

      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const parsed = JSON.parse(value);

        if (!schema) {
          return parsed;
        }

        return schema.parse(parsed);
      } catch (_) {
        throw new BadRequestException('Malformed filter query');
      }
    },
  });
