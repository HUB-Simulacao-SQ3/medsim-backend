import { Controller, Body, Post, Get, Param, UnauthorizedException } from '@nestjs/common';
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
			const { access_token } = jwt.data;
			if (access_token) {
				return ApiResult.response({ data: access_token }, 'Usuário criado com sucesso!');
			} else {
				return ApiResult.response({ data: access_token }, 'Erro ao criar usuário');
			}
		}
		throw new UnauthorizedException('Usuário não encontrado');
	}

	@Post('user')
	async findMany(@Body() data: any) {
		const user = await this.usersService.findOne(data);
		if (user.id) {
			return ApiResult.response({
				data: { ...user },
			});
		} else {
			return ApiResult.response({
				data: {},
			});
		}
	}

	@Get()
	async findAll() {
		const users = await this.usersService.findAll();
		return ApiResult.response({ data: users });
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		const user = await this.usersService.findOne({ id });
		if (user.id) {
			return ApiResult.response({
				data: { ...user },
			});
		} else {
			return ApiResult.response({
				data: {},
			});
		}
	}
}
