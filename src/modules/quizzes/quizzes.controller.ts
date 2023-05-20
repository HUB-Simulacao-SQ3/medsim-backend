import { Controller, Body, Post, Get, Param, Request, Query } from '@nestjs/common';
import { QuizzesDTO, QuizzesOptionalFieldsDTO } from './quizzes.dto';
import { QuizzesService } from './quizzes.service';
import { ApiResult } from '../../core/api.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Quizzes')
@ApiBearerAuth()
@Controller('quizzes')
export class QuizzesController {
	constructor(private quizzesService: QuizzesService) {}

	@Post()
	async create(@Body() data: QuizzesDTO, @Request() request) {
		data.userId = request.user.id;
		const quizzes = await this.quizzesService.create(data);
		if (quizzes?.id) {
			return ApiResult.response({
				data: quizzes,
			});
		} else {
			return ApiResult.response({
				data: quizzes,
			});
		}
		return;
	}

	@Get('filter')
	async findMany(@Query() data: QuizzesOptionalFieldsDTO) {
		const quizzes = await this.quizzesService.findManyWhere(data);
		if (quizzes?.length > 0) {
			return ApiResult.response({
				data: quizzes,
			});
		} else {
			return ApiResult.response({
				data: quizzes,
			});
		}
	}

	@Get()
	async findAll() {
		const quizzes = await this.quizzesService.findAll();
		if (quizzes) {
			return ApiResult.response({
				data: quizzes,
			});
		} else {
			return ApiResult.response({
				data: quizzes,
			});
		}
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		const quizzes = await this.quizzesService.findOne({ id });
		if (quizzes.id) {
			return ApiResult.response({
				data: quizzes,
			});
		} else {
			return ApiResult.response({
				data: quizzes,
			});
		}
	}
}
