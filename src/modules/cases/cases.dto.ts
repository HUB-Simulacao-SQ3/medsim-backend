import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { Difficulty, Prisma } from '@prisma/client';
enum ContentCreatedByEnum {
	ALL = 'ALL',
	MY_CASES = 'MY_CASES',
	OTHERS = 'OTHERS',
}

export class CaseDTO {
	id?: string;
	userId: string;
	patientId: string;
	title: string;
	description: string;
	chiefComplaint: string;
	scenery: string;
	contentCreatedBy?: ContentCreatedByEnum;
	@ApiProperty()
	difficulty?: Difficulty & 'ALL';
	quiz?: Prisma.QuizUncheckedCreateNestedOneWithoutCaseInput;
}

export class CreateCaseDTO extends OmitType(CaseDTO, ['quiz'] as const) {}
export class CaseOptionalFieldsDTO extends PartialType(CreateCaseDTO) {}
