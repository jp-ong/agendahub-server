import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class BaseResponseInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          status: true,
          data: data,
        };
      }),
      catchError((error) => {
        const errorResponse = {
          status: false,
          message: error.message || 'An unexpected error occurred',
        };

        return throwError(
          () => new HttpException(errorResponse, error.status || 500),
        );
      }),
    );
  }
}
