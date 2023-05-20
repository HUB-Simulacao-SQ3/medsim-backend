export interface IApiInterceptorResponse<TData = any> {
	statusCode: number;
	success: boolean;
	message?: string;
	data?: TData;
}

export class ApiInterceptorResult<T = any> {
	public response: IApiInterceptorResponse<T>;

	constructor(response: IApiInterceptorResponse<T>) {
		this.response = response;
	}
}

export class ApiResult<T> {
	private response: { data: T };
	private message?: string;

	constructor(response: { data: T }, message?: string) {
		this.response = response;
		this.message = message;
	}

	static response<T>(response: { data: T }, message?: string) {
		const apiResult = new ApiResult<T>(response, message);
		return {
			data: apiResult.response.data,
			message: apiResult.message,
		};
	}
}
