import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UpdateUserDTO, UserDTO } from './users.dto';
import { AuthDTO } from '../auth/auth.dto';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}
	private selectedDefault = { id: true, email: true, firstName: true, lastName: true, birthday: true };
	async findAuth(auth: AuthDTO) {
		const { email, password } = auth;
		return this.prisma.user.findFirst({ where: { email, password }, select: { ...this.selectedDefault } });
	}

	async findOne(user: Partial<UserDTO>) {
		const { email, firstName, lastName, birthday, id } = user;
		return await this.prisma.user.findFirst({
			where: { OR: [{ email, firstName, lastName, birthday, id }] },
			select: { ...this.selectedDefault, image: true },
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

	async update(data: UpdateUserDTO) {
		if (data?.id) {
			const userUpdate = await this.prisma.user.update({ data, where: { id: data.id } });
			if (userUpdate) return userUpdate;
		}
	}
}
