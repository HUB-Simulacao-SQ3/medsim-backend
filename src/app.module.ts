import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CasesModule } from './modules/cases/cases.module';

@Module({
	imports: [AuthModule, UsersModule, CasesModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
