import { BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ValidationErrorFilter implements ExceptionFilter<ZodError> {
  catch(exception: ZodError) {
    throw new BadRequestException(exception.errors);
  }
}
