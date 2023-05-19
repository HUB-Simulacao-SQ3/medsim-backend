import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { UserDTO } from './users.dto';
import { UsersService } from './users.service';
import { Public } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { ApiResult } from '../../core/api.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
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
		const user = await this.usersService.findOne(data);
		if (user.id) {
			return new ApiResult({
				code: 200,
				data: { ...user },
				success: true,
				message: 'Usuário encontrado com sucesso!',
			});
		} else {
			return new ApiResult({
				code: 200,
				data: {},
				success: true,
				message: 'Erro ao tentar encontrar o usuário!',
			});
		}
	}

	@Get()
	async findAll() {
		return await this.usersService.findAll();
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		const user = await this.usersService.findOne({ id });
		if (user.id) {
			return new ApiResult({
				code: 200,
				data: { ...user },
				success: true,
				message: 'Usuário encontrado com sucesso!',
			});
		} else {
			return new ApiResult({
				code: 200,
				data: {},
				success: true,
				message: 'Erro ao tentar encontrar o usuário!',
			});
		}
	}
}
