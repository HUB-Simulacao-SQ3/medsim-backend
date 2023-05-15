import { Body, Controller, Post, HttpCode, HttpStatus, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.guard';
import { UserDTO } from '../users/users.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('login')
	signIn(@Body() signInDto: UserDTO) {
		return this.authService.signIn(signInDto);
	}

	@Get('profile')
	getProfile(@Request() req: any) {
		return req.user;
	}
}
