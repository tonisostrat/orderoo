import { UseInterceptors } from '@nestjs/common';
import { tap } from 'rxjs';
import { Request, Response } from 'express';

export const AddLocation = (key: string, ...path: string[]) =>
  UseInterceptors({
    intercept: (ctx, next) => {
      return next.handle().pipe(
        tap((data) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { [key]: id } = data;

          const http = ctx.switchToHttp();

          const request = http.getRequest<Request>();
          const response = http.getResponse<Response>();

          response.setHeader(
            'Location',
            `${request.protocol}://${request.host}/${path.join('/')}/${id}`,
          );
        }),
      );
    },
  });
