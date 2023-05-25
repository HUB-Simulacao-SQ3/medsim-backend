import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CasesModule } from './modules/cases/cases.module';
import { PatientsModule } from './modules/patient/patients.module';
import { QuizzesModule } from './modules/quizzes/quizzes.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './intercepts/AllExceptionsFilter';
import { HistoryModule } from './modules/history/history.module';
import { StatisticController } from './modules/statistic/statistic.controller';
import { StatisticModule } from './modules/statistic/statistic.module';

@Module({
	imports: [AuthModule, UsersModule, CasesModule, PatientsModule, QuizzesModule, HistoryModule, StatisticModule],
	controllers: [StatisticController],
	providers: [
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		},
	],
})
export class AppModule {}
