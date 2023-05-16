import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { QuizzesDTO } from './quizzes.dto';

@Injectable()
export class QuizzesService {
	constructor(private prisma: PrismaService) {}

	async findOne(data: Partial<QuizzesDTO>) {
		const { id } = data;
		return this.prisma.quiz.findFirst({ where: { OR: [{ id }] } });
	}

	async findManyWhere(data: Partial<QuizzesDTO>) {
		const { id } = data;
		return this.prisma.quiz.findMany({ where: { OR: [{ id }] } });
	}

	async findAll() {
		return await this.prisma.quiz.findMany();
	}

	async create(data: QuizzesDTO) {
		if (data?.id) {
			const userUpdate = await this.prisma.quiz.update({
				data,
				where: { id: data.id },
			});
			return userUpdate;
		}
		const user = await this.prisma.quiz.create({ data });
		if (user?.id) return user;
		return data;
	}
}
