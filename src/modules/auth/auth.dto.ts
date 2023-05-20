import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDTO {
	@ApiProperty()
	@IsEmail({}, { message: 'Email inválido' })
	email: string;

	@ApiProperty()
	@IsNotEmpty({ message: 'O campo de senha é obrigatório' })
	password: string;
}
