import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface AppResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
export declare class ResponseInterceptor<T> implements NestInterceptor<T, AppResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<AppResponse<T>>;
}
