import { ApiProperty } from '@nestjs/swagger';
import { Difficulty, Prisma } from '@prisma/client';
enum ContentCreatedByEnum {
	ALL = 'ALL',
	MY_CASES = 'MY_CASES',
	OTHERS = 'OTHERS',
}

export class CaseDTO {
	@ApiProperty()
	id?: string;

	@ApiProperty()
	userId: string;

	@ApiProperty()
	patientId: string;

	@ApiProperty()
	title: string;

	@ApiProperty()
	description: string;

	@ApiProperty()
	chiefComplaint: string;

	@ApiProperty()
	scenery: string;

	@ApiProperty()
	contentCreatedBy?: ContentCreatedByEnum;

	@ApiProperty()
	difficulty?: Difficulty & 'ALL';

	@ApiProperty()
	quiz?: Prisma.QuizUncheckedCreateNestedOneWithoutCaseInput;
}
