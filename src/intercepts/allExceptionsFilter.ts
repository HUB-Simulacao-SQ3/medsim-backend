import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

	catch(exception: any, host: ArgumentsHost): void {
		const { httpAdapter } = this.httpAdapterHost;
		const ctx = host.switchToHttp();
		const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

		let errorMessage = 'Internal Server Error';

		if (exception instanceof Error || exception?.message) {
			errorMessage = exception.message;
		}

		const responseBody = {
			statusCode: httpStatus,
			timestamp: new Date().toISOString(),
			path: httpAdapter.getRequestUrl(ctx.getRequest()),
			success: false,
			error: errorMessage,
			message: exception.response,
		};

		console.log(exception);
		httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
	}
}
