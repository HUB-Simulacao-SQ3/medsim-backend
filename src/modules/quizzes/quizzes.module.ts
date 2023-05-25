import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { PrismaService } from '../../database/prisma.service';
import { HistoryService } from '../history/history.service';
import { StatisticService } from '../statistic/statistic.service';

@Module({
	providers: [QuizzesService, HistoryService, StatisticService, PrismaService],
	exports: [QuizzesService],
	controllers: [QuizzesController],
})
export class QuizzesModule {}
