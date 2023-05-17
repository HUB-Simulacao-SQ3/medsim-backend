import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { PatientDTO } from './patients.dto';

@Injectable()
export class PatientsService {
	constructor(private prisma: PrismaService) {}

	async findOne(data: Partial<PatientDTO>, userId: string) {
		const { birthday, id, firstName, lastName } = data;
		return this.prisma.patient.findFirst({ where: { OR: [{ birthday, id, firstName, lastName }], AND: [{ userId }] } });
	}

	async findManyWhere(data: Partial<PatientDTO>, userId: string) {
		const { birthday, id, firstName, lastName } = data;
		return this.prisma.patient.findMany({ where: { OR: [{ birthday, id, firstName, lastName }], AND: [{ userId }] } });
	}

	async findAll(userId: string) {
		return await this.prisma.patient.findMany({ where: { userId } });
	}

	async create(data: PatientDTO) {
		console.log(data?.id);
		if (data?.id !== undefined) {
			const userUpdate = await this.prisma.patient.update({ data, where: { id: data.id } });
			if (userUpdate) return userUpdate;
		}
		const user = await this.prisma.patient.create({ data });
		if (user?.id) return user;
		return undefined;
	}
}
