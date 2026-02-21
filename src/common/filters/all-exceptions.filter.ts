import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    const exceptionResponse = exception instanceof HttpException ? exception.getResponse() : null;
    let details: any[] = [];
    let errorCode = exception instanceof HttpException ? 'EXPECTED_ERROR' : 'INTERNAL_SERVER_ERROR';

    if (exceptionResponse && typeof exceptionResponse === 'object') {
      if ('message' in exceptionResponse) {
        if (Array.isArray((exceptionResponse as any).message)) {
            details = (exceptionResponse as any).message;
        } else {
            details = [(exceptionResponse as any).message];
        }
      }
      if ('error' in exceptionResponse) {
        errorCode = (exceptionResponse as any).error; // e.g. "Bad Request"
      }
    }

    if (status === HttpStatus.INTERNAL_SERVER_ERROR && exception instanceof Error) {
        this.logger.error(`Exception on ${request.method} ${request.url}`, exception.stack);
    }

    response.status(status).json({
      success: false,
      message,
      errorCode,
      details,
    });
  }
}
