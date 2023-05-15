import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { PatientDTO } from './patients.dto';

@Injectable()
export class PatientsService {
	constructor(private prisma: PrismaService) {}

	async findOne(data: Partial<PatientDTO>) {
		const { birthday, id, firstName, lastName } = data;
		return this.prisma.patient.findFirst({ where: { OR: [{ birthday, id, firstName, lastName }] } });
	}

	async findManyWhere(data: Partial<PatientDTO>) {
		const { birthday, id, firstName, lastName } = data;
		return this.prisma.patient.findMany({ where: { OR: [{ birthday, id, firstName, lastName }] } });
	}

	async findAll() {
		return await this.prisma.patient.findMany();
	}

	async create(data: PatientDTO) {
		const userExists = await this.prisma.patient.findFirst({ where: { id: data.id } });
		if (userExists) return userExists;
		const user = await this.prisma.patient.create({ data });
		if (user?.id) return user;
		return undefined;
	}
}
