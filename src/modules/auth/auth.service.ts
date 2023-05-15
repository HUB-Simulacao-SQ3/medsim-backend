import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../users/users.dto';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwtService: JwtService) {}

	async signIn(user: UserDTO) {
		const userFind = await this.usersService.findOne(user);
		if (userFind?.password !== user.password) {
			throw new UnauthorizedException();
		}
		const payload = { user };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
