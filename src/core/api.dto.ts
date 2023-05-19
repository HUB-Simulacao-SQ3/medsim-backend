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

// import { HttpStatus } from '@nestjs/common';

// export interface IApiResultProps<TData = any> {
// 	message: string;
// 	error: string;
// 	statusCode: HttpStatus;
// 	success: boolean;
// 	data: TData;
// }

// export class ApiResult<T = any> {
// 	public response: IApiResultProps<T>;

// 	constructor(response: IApiResultProps<T>) {
// 		this.response = response;
// 	}
// }
