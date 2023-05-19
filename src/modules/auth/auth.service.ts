import { Injectable } from '@nestjs/common';
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
			return new ApiResult<{ access_token: string }>({
				code: 200,
				data: { access_token: '' },
				success: false,
				message: 'Não foi possível autenticar o usuário',
			});
		}
		delete authFind.password;
		const payload = { user: authFind };

		if (authFind?.id) {
			return new ApiResult<{ access_token: string }>({
				code: 200,
				data: {
					access_token: await this.jwtService.signAsync(payload),
				},
				success: true,
				message: 'Usuário autenticado com sucesso!',
			});
		} else {
			return new ApiResult<{ access_token: string }>({
				code: 200,
				data: { access_token: '' },
				success: true,
				message: 'Não foi possível autenticar o usuário',
			});
		}
	}
}
