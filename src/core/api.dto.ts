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
	private _response: { data: T };
	private _message?: string;

	constructor(response: { data: T }, message?: string) {
		this._response = response;
		this._message = message;
	}

	static result<T>(response: { data: T }, message?: string) {
		return new ApiResult<T>(response, message);
	}

	get response() {
		return this._response;
	}
	get message() {
		return this._message;
	}

	get data() {
		return {
			...this._response.data,
			message: this.message,
		};
	}
}
