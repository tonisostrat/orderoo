import { ZodSchema } from 'zod';
import { Logger } from '@nestjs/common';

export abstract class BaseCommand<I extends object | void, O> {
  protected readonly logger: Logger;

  constructor(
    private readonly schema?: ZodSchema<I>,
    private readonly transform?: boolean,
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  protected abstract doWork(input?: I): Promise<O>;

  async execute(input: I): Promise<O> {
    try {
      return await this.doWork(this.sanitizeInput(input));
    } catch (error) {
      this.logger.error('Failed to execute command', error);

      throw error;
    }
  }

  private sanitizeInput(input: I) {
    if (!this.schema) {
      return input;
    }

    const { success, error, data } = this.schema.safeParse(input);

    if (!success) {
      throw error;
    }

    if (this.transform) {
      return data;
    }

    return input;
  }
}
