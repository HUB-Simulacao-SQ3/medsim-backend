import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CaseDTO } from './cases.dto';

@Injectable()
export class CasesService {
	constructor(private prisma: PrismaService) {}
	async findOne(data: Partial<CaseDTO>) {
		const { chiefComplaint, description, id, scenery, title } = data;
		return this.prisma.case.findFirst({ where: { OR: [{ chiefComplaint, description, id, scenery, title }] } });
	}

	async findManyWhere(data: Partial<CaseDTO>) {
		const { chiefComplaint, description, id, scenery, title } = data;
		return this.prisma.case.findMany({ where: { OR: [{ chiefComplaint, description, id, scenery, title }] } });
	}
	async findAll() {
		return await this.prisma.case.findMany();
	}
	async create(data: CaseDTO) {
		const { id } = data;
		const userExists = await this.prisma.case.findFirst({ where: { id } });
		if (userExists) return userExists;
		const user = await this.prisma.case.create({ data });
		if (user?.id) return user;
		return undefined;
	}
}
