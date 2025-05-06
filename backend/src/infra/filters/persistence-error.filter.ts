import {
  Catch,
  ConflictException,
  ExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { DatabaseError } from 'pg';

@Catch(QueryFailedError)
export class PersistenceErrorFilter
  implements ExceptionFilter<QueryFailedError<DatabaseError>>
{
  catch(exception: QueryFailedError<DatabaseError>) {
    if (exception.driverError.routine?.includes('unique')) {
      throw new ConflictException();
    }

    throw new InternalServerErrorException();
  }
}
