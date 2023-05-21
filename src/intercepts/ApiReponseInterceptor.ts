import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ApiInterceptorResult, ApiResult } from '../core/api.dto';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const response = context.switchToHttp().getResponse();
		return next.handle().pipe(
			map(async (result: ApiResult<any>) => {
				return new ApiInterceptorResult({
					statusCode: response.statusCode,
					success: true,
					data: result.response.data,
					message: result.message,
				});
			})
		);
	}
}
