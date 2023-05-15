import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { PrismaService } from '../../database/prisma.service';

@Module({
	providers: [QuizzesService, PrismaService],
	exports: [QuizzesService],
	controllers: [QuizzesController],
})
export class QuizzesModule {}
