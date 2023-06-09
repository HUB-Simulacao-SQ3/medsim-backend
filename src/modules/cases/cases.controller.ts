import { Body, Controller, Delete, Get, Param, Post, Query, Request } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CaseDTO, CaseOptionalFieldsDTO, CreateCaseDTO } from './cases.dto';
import { ApiResult } from '../../core/api.dto';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Cases')
@ApiBearerAuth()
@Controller('cases')
export class CasesController {
	constructor(private casesService: CasesService) {}

	@Post()
	@ApiBody({ type: CreateCaseDTO, required: false, enum: CreateCaseDTO['difficulty'] })
	async create(@Body() data: CreateCaseDTO, @Request() request) {
		data.userId = request.user.id;
		const cases = await this.casesService.create(data);
		if (cases?.id) {
			return ApiResult.result({ data: cases });
		} else {
			return ApiResult.result({ data: cases });
		}
	}

	@Get('filter')
	@ApiQuery({ type: CaseOptionalFieldsDTO, required: false })
	async filterDifficultyContentCreatedBy(@Query() data: Partial<CaseDTO>, @Request() request) {
		if (Object.keys(data).length > 0) {
			data.userId = request?.user?.id;
			const cases = await this.casesService.filterDifficultyContentCreatedBy(data);
			if (cases) {
				return ApiResult.result({ data: cases });
			} else {
				return ApiResult.result({ data: cases });
			}
		} else {
			return this.findAll();
		}
	}

	@Get()
	async findAll() {
		const cases = await this.casesService.findAll();
		if (cases) {
			return ApiResult.result({ data: cases });
		} else {
			return ApiResult.result({ data: cases });
		}
	}

	@Get(':id')
	async findById(@Param('id') id: string, @Request() request) {
		const userId = request.user.id;
		const cases = await this.casesService.findOne({ id, userId });
		if (cases.id) {
			return ApiResult.result({ data: cases });
		} else {
			return ApiResult.result({ data: cases });
		}
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const cases = await this.casesService.delete(id);
		if (cases) {
			return ApiResult.result({ data: cases });
		} else {
			return ApiResult.result({ data: cases });
		}
	}
}
