import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CaseUserHistoryDTO, CaseUserHistoryOptionalFieldsDTO } from './history.dto';

@Injectable()
export class HistoryService {
	constructor(private prisma: PrismaService) {}

	async create(data: CaseUserHistoryDTO) {
		return await this.prisma.caseUserHistory.create({
			data,
		});
	}

	async findWhereAll(data: CaseUserHistoryOptionalFieldsDTO) {
		const { caseId, userId } = data;
		return await this.prisma.caseUserHistory.findMany({
			orderBy: [
				{
					createdAt: 'desc',
				},
			],
			where: {
				caseId,
				userId,
			},
		});
	}

	async findOne(data: any) {
		return await this.prisma.caseUserHistory.findUnique({
			where: {
				id: data.id,
			},
		});
	}
}
