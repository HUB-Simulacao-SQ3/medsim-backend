import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../../database/prisma.service';
import { AuthService } from '../auth/auth.service';

@Module({
	providers: [UsersService, PrismaService, AuthService],
	exports: [UsersService],
	controllers: [UsersController],
})
export class UsersModule {}
