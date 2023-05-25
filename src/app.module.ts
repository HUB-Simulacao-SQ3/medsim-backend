import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CasesModule } from './modules/cases/cases.module';
import { PatientsModule } from './modules/patient/patients.module';
import { QuizzesModule } from './modules/quizzes/quizzes.module';
import { APP_FILTER } from '@nestjs/core';
import { HistoryModule } from './modules/history/history.module';
import { StatisticModule } from './modules/statistic/statistic.module';
import { AllExceptionsFilter } from './intercepts/allExceptionsFilter';

@Module({
	imports: [AuthModule, UsersModule, CasesModule, PatientsModule, QuizzesModule, HistoryModule, StatisticModule],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		},
	],
})
export class AppModule {}
