import { Schema } from '../schemas';
import {
  applyDecorators,
  BadRequestException,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

type TransformSchemas<O = any, I = O> = {
  in?: Schema<I>;
  out?: Schema<O>;
};

export const Transform = <O, I>(schemas: TransformSchemas<O, I>) => {
  return applyDecorators(
    UsePipes({
      transform: (value: unknown, _) => {
        if (!schemas.in) {
          return value;
        }

        const { success, error, data } = schemas.in.safeParse(value);

        if (!success) {
          throw new BadRequestException(error?.issues);
        }

        return data;
      },
    }),
    UseInterceptors({
      intercept: (_, next) => {
        return next.handle().pipe(
          map((data: unknown) => {
            if (!schemas.out) {
              return data;
            }

            return schemas.out.parse(data);
          }),
        );
      },
    }),
  );
};
