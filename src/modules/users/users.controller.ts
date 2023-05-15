import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { UserDTO } from './users.dto';
import { UsersService } from './users.service';
import { Public } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Public()
	@Post()
	async create(@Body() user: UserDTO) {
		return await this.usersService.create(user);
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
