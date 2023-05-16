export interface IApiResponse<TData = any> {
	code: number;
	success: boolean;
	message?: string;
	data?: TData;
	detailsMessage?: [];
}

export class ApiResult<T = any> {
	public response: IApiResponse<T>;

	constructor(response: IApiResponse<T>) {
		this.response = response;
	}
}
