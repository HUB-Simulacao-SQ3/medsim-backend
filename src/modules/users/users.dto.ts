import { OmitType, PartialType } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class UserDTO {
	id?: string;

	@IsNotEmpty({ message: 'É necessário informar o firstName' })
	firstName: string;
	@IsNotEmpty({ message: 'É necessário informar o lastName' })
	lastName: string;
	@IsNotEmpty({ message: 'É necessário informar o password' })
	password: string;
	@IsNotEmpty({ message: 'É necessário informar o email' })
	email: string;
	@IsNotEmpty({ message: 'É necessário informar o birthday' })
	birthday: string;

	image?: Buffer | null;
	groupRole?: Role;
	createdAt?: Date | string;
	updatedAt?: Date | string;
	results?: any;
	Quiz?: any;
	Case?: any;
	Patient?: any;
}

export class CreateUserDTO extends OmitType(UserDTO, [
	'createdAt',
	'updatedAt',
	'Case',
	'image',
	'groupRole',
	'createdAt',
	'updatedAt',
	'results',
	'Quiz',
	'Case',
	'Patient',
] as const) {}
export class UserOptionalFieldsDTO extends PartialType(CreateUserDTO) {}
