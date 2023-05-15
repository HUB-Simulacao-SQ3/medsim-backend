import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UserDTO } from './users.dto';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async findAuth(user: UserDTO) {
		const { email, password } = user;
		return this.prisma.user.findFirst({ where: { email, password } });
	}

	async findOne(user: Partial<UserDTO>) {
		const { email, firstname, lastname, birthday, id } = user;
		return this.prisma.user.findFirst({ where: { OR: [{ email, firstname, lastname, birthday, id }] } });
	}

	async findManyWhere(user: Partial<UserDTO>) {
		const { email, firstname, lastname, birthday } = user;
		return this.prisma.user.findMany({ where: { OR: [{ email, firstname, lastname, birthday }] } });
	}

	async findAll() {
		return await this.prisma.user.findMany();
	}

	async create(data: UserDTO) {
		const userExists = await this.prisma.user.findFirst({ where: { email: data.email } });
		if (userExists) return userExists;
		const user = await this.prisma.user.create({ data });
		if (user?.id) return user;
		return undefined;
	}
}
