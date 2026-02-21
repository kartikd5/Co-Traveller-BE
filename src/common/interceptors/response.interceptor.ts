import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AppResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, AppResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<AppResponse<T>> {
    return next.handle().pipe(
      map(data => {
        // Use custom message if returned, else default
        const message = data && data.message ? data.message : 'Operation successful';
        // Remove message from data payload to not duplicate it
        if (data && data.message) {
           const { message: _, ...rest } = data;
           data = Object.keys(rest).length ? rest : {};
        }

        return {
          success: true,
          message: message,
          data: data || {},
        };
      }),
    );
  }
}
