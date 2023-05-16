import { Controller, Body, Post, Get, Param, Request } from '@nestjs/common';
import { QuizzesDTO } from './quizzes.dto';
import { QuizzesService } from './quizzes.service';
import { ApiResult } from '../../core/api.dto';

@Controller('quizzes')
export class QuizzesController {
	constructor(private quizzesService: QuizzesService) {}

	@Post()
	async create(@Body() data: QuizzesDTO, @Request() request) {
		data.userId = request.user.id;
		const quizzes = await this.quizzesService.create(data);
		if (quizzes?.id) {
			return new ApiResult({
				code: 0,
				success: true,
				data: quizzes,
			});
		} else {
			return new ApiResult({
				code: 0,
				success: false,
				data: quizzes,
			});
		}
		return;
	}

	@Post('quiz')
	async findMany(@Body() data: any) {
		const quizzes = await this.quizzesService.findOne(data);
		if (quizzes?.id) {
			return new ApiResult({
				code: 0,
				success: true,
				data: quizzes,
			});
		} else {
			return new ApiResult({
				code: 0,
				success: false,
				data: quizzes,
			});
		}
		return;
	}

	@Get()
	async findAll() {
		const quizzes = await this.quizzesService.findAll();
		if (quizzes) {
			return new ApiResult({
				code: 0,
				success: true,
				data: quizzes,
			});
		} else {
			return new ApiResult({
				code: 0,
				success: false,
				data: quizzes,
			});
		}
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		const quizzes = await this.quizzesService.findOne({ id });
		if (quizzes.id) {
			return new ApiResult({
				code: 0,
				success: true,
				data: quizzes,
			});
		} else {
			return new ApiResult({
				code: 0,
				success: false,
				data: quizzes,
			});
		}
		return;
	}
}
