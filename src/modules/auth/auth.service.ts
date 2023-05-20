import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ApiResult } from '../../core/api.dto';
import { AuthDTO } from './auth.dto';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwtService: JwtService) {}

	async signIn(auth: AuthDTO) {
		const authFind = await this.usersService.findAuth(auth);
		if (authFind?.password !== auth.password) {
			throw new UnauthorizedException('Não foi possível autenticar o usuário');
		}
		delete authFind.password;
		const payload = { user: authFind };

		if (authFind?.id) {
			return ApiResult.response(
				{
					data: {
						access_token: await this.jwtService.signAsync(payload),
					},
				},
				'Usuário autenticado com sucesso!'
			);
		} else {
			throw new InternalServerErrorException('Ocorreu um erro interno no servidor');
		}
	}
}
