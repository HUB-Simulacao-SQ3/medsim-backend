import { Module } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { PrismaService } from '../../database/prisma.service';

@Module({
	providers: [PrismaService, CasesService],
	controllers: [CasesController],
})
export class CasesModule {}
