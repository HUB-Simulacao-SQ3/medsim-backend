import { Controller, Body, Post, Get, Param, Request, Query } from '@nestjs/common';
import { QuizzesDTO, QuizzesOptionalFieldsDTO, ValidateSelectedQuestion } from './quizzes.dto';
import { QuizzesService } from './quizzes.service';
import { ApiResult } from '../../core/api.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QuestionDTO } from '../../core/question.dto';
import { HistoryService } from '../history/history.service';

@ApiTags('Quizzes')
@ApiBearerAuth()
@Controller('quizzes')
export class QuizzesController {
	constructor(private quizzesService: QuizzesService, private historyService: HistoryService) {}

	@Post()
	async create(@Body() data: QuizzesDTO, @Request() request) {
		data.userId = request.user.id;
		const quizzes = await this.quizzesService.create(data);
		if (quizzes?.id) {
			return ApiResult.result({
				data: quizzes,
			});
		} else {
			return ApiResult.result({
				data: quizzes,
			});
		}
		return;
	}

	@Get('filter')
	async findMany(@Query() data: QuizzesOptionalFieldsDTO) {
		const quizzes = await this.quizzesService.findManyWhere(data);
		if (quizzes?.length > 0) {
			return ApiResult.result(
				{
					data: quizzes,
				},
				'Quizzes filtrados'
			);
		} else {
			return ApiResult.result({
				data: quizzes,
			});
		}
	}

	@Get()
	async findAll() {
		const quizzes = await this.quizzesService.findAll();
		if (quizzes) {
			return ApiResult.result(
				{
					data: quizzes,
				},
				'Lista de todos os quizzes'
			);
		} else {
			return ApiResult.result({
				data: quizzes,
			});
		}
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		const quizzes = await this.quizzesService.findOne({ id });
		if (quizzes.id) {
			return ApiResult.result({
				data: quizzes,
			});
		} else {
			return ApiResult.result({
				data: quizzes,
			});
		}
	}

	@Post('validate-selected-question')
	async validateSelectedQuestion(@Body() data: ValidateSelectedQuestion, @Request() request) {
		const userId = request.user.id;
		const quizzes = await this.quizzesService.findOne({ id: data.quizId });
		const questions = quizzes.questions as unknown as QuestionDTO[];
		const questionNode = questions.find((question) => question.nodeId === data.nodeId);
		let result: ApiResult<any> = {} as ApiResult<any>;

		if (questionNode?.nodeId && questionNode.correctAlternative === String(data.questionSelected.index)) {
			result = ApiResult.result(
				{
					data: { isCorrect: true },
				},
				'Alternativa correta'
			);
		} else {
			result = ApiResult.result(
				{
					data: { isCorrect: false },
				},
				'Alternativa incorreta'
			);
		}

		const nextQuestion = questionNode?.rollbackQuestions?.[+data?.questionSelected?.index]?.targetNode ?? 'CONCLUDED';
		await this.historyService.create({
			caseId: data.caseId,
			history: {
				question: questionNode.question,
				answer: data.questionSelected.text,
				nextQuestion,
			},
			userId,
		});

		return result;
	}
}
