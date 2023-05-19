import { Body, Controller, Get, Param, Post, Query, Request } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CaseDTO } from './cases.dto';
import { ApiResult } from '../../core/api.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Cases')
@ApiBearerAuth()
@Controller('cases')
export class CasesController {
	constructor(private casesService: CasesService) {}

	@Post()
	async create(@Body() data: CaseDTO, @Request() request) {
		data.userId = request.user.id;
		const cases = await this.casesService.create(data);
		if (cases?.id) {
			return new ApiResult({
				code: 0,
				success: true,
				data: cases,
			});
		} else {
			return new ApiResult({
				code: 0,
				success: false,
				data: cases,
			});
		}
	}

	@Get('filter')
	async filterDifficultyContentCreatedBy(@Query() data: CaseDTO, @Request() request) {
		data.userId = request?.user?.id;
		const cases = await this.casesService.filterDifficultyContentCreatedBy(data);
		if (cases) {
			return new ApiResult({
				code: 0,
				success: true,
				data: cases,
			});
		} else {
			return new ApiResult({
				code: 0,
				success: false,
				data: cases,
			});
		}
	}

	@Get('all')
	async findManyWhere() {
		const cases = await this.casesService.findManyWhere({ includePatient: true, includeQuiz: true });
		if (cases) {
			return new ApiResult({
				code: 0,
				success: true,
				data: cases,
			});
		} else {
			return new ApiResult({
				code: 0,
				success: false,
				data: cases,
			});
		}
	}

	@Get()
	async findAll() {
		const cases = await this.casesService.findAll();
		if (cases) {
			return new ApiResult({
				code: 0,
				success: true,
				data: cases,
			});
		} else {
			return new ApiResult({
				code: 0,
				success: false,
				data: cases,
			});
		}
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		const cases = await this.casesService.findOne({ id });
		if (cases.id) {
			return new ApiResult({
				code: 0,
				success: true,
				data: cases,
			});
		} else {
			return new ApiResult({
				code: 0,
				success: false,
				data: cases,
			});
		}
	}
}
