import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CaseOptionalFieldsDTO, CreateUserStatisticDTO } from './statistic.dto';

@Injectable()
export class StatisticService {
	constructor(private prisma: PrismaService) {}

	async createOrUpdate(data: CreateUserStatisticDTO) {
		const { id } = data;

		if (id) {
			const userStatistic = await this.prisma.userStatistics.update({ data, where: { id } });
			if (userStatistic.id) {
				return userStatistic;
			}
		} else {
			const userStatistic = await this.prisma.userStatistics.create({ data });
			if (userStatistic?.id) {
				return userStatistic;
			}
		}

		return {} as CreateUserStatisticDTO;
	}

	async getFilter(data: CaseOptionalFieldsDTO) {
		const userStatisticFiltered = await this.prisma.userStatistics.findMany({ where: { ...data } });
		return userStatisticFiltered;
	}

	async findAll(data: CaseOptionalFieldsDTO) {
		const userStatisticFiltered = await this.prisma.userStatistics.findMany({ where: { ...data } });
		return userStatisticFiltered;
	}

	async findUniqueUserId(data: CaseOptionalFieldsDTO) {
		const userStatisticFiltered = await this.prisma.userStatistics.findUnique({ where: { userId: data?.userId } });
		return userStatisticFiltered;
	}
}
