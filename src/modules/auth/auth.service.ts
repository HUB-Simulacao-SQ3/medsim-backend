import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../users/users.dto';
import { ApiResult } from '../../core/api.dto';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwtService: JwtService) {}

	async signIn(user: UserDTO) {
		const userFind = await this.usersService.findAuth(user);
		if (userFind?.password !== user.password) {
			return new ApiResult<{ access_token: string }>({
				code: 200,
				data: { access_token: '' },
				success: false,
				message: 'Não foi possível autenticar o usuário',
			});
		}
		delete userFind.password;
		const payload = { user: userFind };

		if (userFind?.id) {
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
