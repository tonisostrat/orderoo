import {
  Catch,
  ExceptionFilter,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

@Catch(NotFoundException, EntityNotFoundError)
export class UnknownRouteFilter implements ExceptionFilter {
  catch() {
    throw new ForbiddenException();
  }
}
