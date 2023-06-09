import { Controller, Body, Post, Get, Request, Param, Patch, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';
import { UsersService } from './users.service';
import { Public } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { ApiResult } from '../../core/api.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService, private authService: AuthService) {}

	@Public()
	@Post()
	@ApiBody({ type: CreateUserDTO })
	async create(@Body() user: CreateUserDTO, @Request() request) {
		const userId = request.user.id;
		const userCreated = await this.usersService.create({ ...user, id: userId });

		if (userCreated.id) {
			const jwt = await this.authService.signIn(userCreated);
			const { access_token } = jwt.data;
			if (access_token) {
				return ApiResult.result({ data: { access_token } }, 'Usuário criado com sucesso!');
			} else {
				return ApiResult.result({ data: { access_token } }, 'Erro ao criar usuário');
			}
		}
		throw new UnauthorizedException('Usuário não encontrado');
	}

	@Patch()
	@ApiBody({ type: CreateUserDTO })
	async update(@Body() user: UpdateUserDTO, @Request() request) {
		const userId = request.user.id;
		const userCreated = await this.usersService.update({ ...user, id: userId });

		if (userCreated.id) {
			const jwt = await this.authService.signIn(userCreated);
			const { access_token } = jwt.data;
			if (access_token) {
				return ApiResult.result({ data: { access_token } }, 'Usuário atualizado com sucesso!');
			} else {
				return ApiResult.result({ data: { access_token } }, 'Erro ao atualizado usuário');
			}
		}
		throw new UnauthorizedException('Usuário não encontrado');
	}

	@Post('user')
	async findMany(@Body() data: any) {
		const user = await this.usersService.findOne(data);
		if (user.id) {
			return ApiResult.result({
				data: { ...user },
			});
		} else {
			return ApiResult.result({
				data: {},
			});
		}
	}

	@Get()
	async findAll() {
		const users = await this.usersService.findAll();
		return ApiResult.result({ data: users });
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		const user = await this.usersService.findOne({ id });
		if (user.id) {
			return ApiResult.result({
				data: { ...user },
			});
		} else {
			return ApiResult.result({
				data: {},
			});
		}
	}
}
