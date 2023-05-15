import { Module } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';

@Module({
	providers: [PatientsService, PrismaService],
	exports: [PatientsService],
	controllers: [PatientsController],
})
export class PatientsModule {}
