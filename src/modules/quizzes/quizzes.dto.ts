import { OmitType, PartialType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class QuizzesDTO {
	id?: string;

	@IsNotEmpty({ message: 'É necessário informar o userId' })
	userId: string;
	@IsNotEmpty({ message: 'É necessário informar o caseId' })
	caseId: string;
	@IsNotEmpty({ message: 'É necessário informar o questions' })
	questions: Prisma.NullTypes.JsonNull | Prisma.InputJsonValue;
	@IsNotEmpty({ message: 'É necessário informar o nodes' })
	nodes: Prisma.NullTypes.JsonNull | Prisma.InputJsonValue;

	edges?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
	createdAt?: string | Date;
	updatedAt?: string | Date;
}

export class CreateQuizzesDTO extends OmitType(QuizzesDTO, ['createdAt', 'updatedAt', 'edges'] as const) {}
export class QuizzesOptionalFieldsDTO extends PartialType(CreateQuizzesDTO) {}
