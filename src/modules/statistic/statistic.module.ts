import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { PrismaService } from '../../database/prisma.service';
import { UsersService } from '../users/users.service';
import { CasesService } from '../cases/cases.service';
import { HistoryService } from '../history/history.service';

@Module({
	providers: [PrismaService, UsersService, StatisticService, CasesService, HistoryService],
	exports: [StatisticService],
	controllers: [StatisticController],
})
export class StatisticModule {}
