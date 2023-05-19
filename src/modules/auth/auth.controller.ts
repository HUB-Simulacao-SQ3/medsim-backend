import { Body, Controller, Post, HttpCode, HttpStatus, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { AuthDTO } from './auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('login')
	signIn(@Body() signInDto: AuthDTO) {
		return this.authService.signIn(signInDto);
	}

	@Get('profile')
	getProfile(@Request() req: any) {
		return req.user;
	}
}
