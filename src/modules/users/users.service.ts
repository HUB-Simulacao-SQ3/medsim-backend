import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UserDTO } from './users.dto';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}
	private selectedDefault = { id: true, email: true, firstName: true, lastName: true, birthday: true };
	async findAuth(user: UserDTO) {
		const { email, password } = user;
		return this.prisma.user.findFirst({ where: { email, password } });
	}

	async findOne(user: Partial<UserDTO>) {
		const { email, firstName, lastName, birthday, id } = user;
		return await this.prisma.user.findFirst({
			where: { OR: [{ email, firstName, lastName, birthday, id }] },
			select: this.selectedDefault,
		});
	}

	async findManyWhere(user: Partial<UserDTO>) {
		const { email, firstName, lastName, birthday } = user;
		return this.prisma.user.findMany({
			where: { OR: [{ email, firstName, lastName, birthday }] },
			select: this.selectedDefault,
		});
	}

	async findAll() {
		return await this.prisma.user.findMany({ select: this.selectedDefault });
	}

	async create(data: UserDTO) {
		if (data?.id) {
			const userUpdate = await this.prisma.user.update({ data, where: { id: data.id } });
			if (userUpdate) return userUpdate;
		}
		const user = await this.prisma.user.create({ data });
		if (user?.id) return user;
		return undefined;
	}
}
