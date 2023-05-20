import { PartialType, OmitType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

enum ContentCreatedByEnum {
	ALL = 'ALL',
	MY_CASES = 'MY_CASES',
	OTHERS = 'OTHERS',
}

enum DifficultyEnum {
	EASY = 'EASY',
	MEDIUM = 'MEDIUM',
	HARD = 'HARD',
}

export class CaseDTO {
	id?: string;

	@IsNotEmpty({ message: 'É necessário informar o userId' })
	userId: string;
	@IsNotEmpty({ message: 'É necessário informar o patientId' })
	patientId: string;
	@IsNotEmpty({ message: 'É necessário informar o title' })
	title: string;
	@IsNotEmpty({ message: 'É necessário informar o description' })
	description: string;
	@IsNotEmpty({ message: 'É necessário informar o chiefComplaint' })
	chiefComplaint: string;
	@IsNotEmpty({ message: 'É necessário informar o scenery' })
	scenery: string;

	contentCreatedBy?: ContentCreatedByEnum;
	difficulty?: DifficultyEnum;
	quiz?: Prisma.QuizUncheckedCreateNestedOneWithoutCaseInput;
}

export class CreateCaseDTO extends OmitType(CaseDTO, ['quiz'] as const) {}
export class CaseOptionalFieldsDTO extends PartialType(CreateCaseDTO) {}
