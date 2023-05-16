import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { UserDTO } from './users.dto';
import { UsersService } from './users.service';
import { Public } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { ApiResult } from '../../core/api.dto';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService, private authService: AuthService) {}

	@Public()
	@Post()
	async create(@Body() user: UserDTO) {
		const userCreated = await this.usersService.create(user);

		if (userCreated.id) {
			const jwt = await this.authService.signIn(userCreated);
			const { access_token } = jwt.response.data;
			if (access_token) {
				return new ApiResult({
					code: 200,
					data: {},
					success: true,
					message: 'Usuário criado com sucesso!',
				});
			} else {
				return new ApiResult({
					code: 200,
					data: jwt,
					success: true,
					message: 'Erro ao criar o usuário!',
				});
			}
		}

		return new ApiResult({
			code: 500,
			data: {},
			success: false,
			message: 'Não foi possível criar o usuário',
		});
	}

	@Post('user')
	async findMany(@Body() data: any) {
		return await this.usersService.findOne(data);
	}

	@Get()
	async findAll() {
		return await this.usersService.findAll();
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.usersService.findOne({ id });
	}
}
