import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CaseDTO } from './cases.dto';

@Injectable()
export class CasesService {
	constructor(private prisma: PrismaService) {}
	async findOne(data: Partial<CaseDTO>) {
		const { id } = data;
		return this.prisma.case.findFirst({ where: { id }, include: { quiz: true, patient: true } });
	}

	async findManyWhere(data: Partial<CaseDTO>) {
		const { chiefComplaint, description, id, scenery, title, difficulty, userId } = data;

		return this.prisma.case.findMany({
			where: {
				OR: [{ chiefComplaint }, { description }, { id }, { scenery }, { title }, { difficulty }, { userId }],
				AND: [data.contentCreatedBy === 'MY_CASES' ? { userId } : { NOT: { userId } }],
			},
			include: {
				quiz: {
					select: { id: true },
				},
			},
		});
	}
	async findAll() {
		return await this.prisma.case.findMany({
			include: {
				user: { select: { id: true } },
				quiz: { select: { id: true } },
			},
		});
	}
	async create(data: CaseDTO) {
		const { id } = data;
		if (id) {
			const userUpdate = await this.prisma.case.update({ data, where: { id } });
			if (userUpdate) return userUpdate;
		}
		const user = await this.prisma.case.create({ data });
		if (user?.id) return user;
		return undefined;
	}
}
