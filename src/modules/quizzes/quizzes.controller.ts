import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { QuizzesDTO } from './quizzes.dto';
import { QuizzesService } from './quizzes.service';
import { Public } from '../auth/auth.guard';

@Controller('quizzes')
export class QuizzesController {
	constructor(private quizzesService: QuizzesService) {}

	@Public()
	@Post()
	async create(@Body() data: QuizzesDTO) {
		return await this.quizzesService.create(data);
	}

	@Post('quiz')
	async findMany(@Body() data: any) {
		return await this.quizzesService.findOne(data);
	}

	@Get()
	async findAll() {
		return await this.quizzesService.findAll();
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.quizzesService.findOne({ id });
	}
}
