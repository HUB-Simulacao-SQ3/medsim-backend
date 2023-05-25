import { OmitType, PartialType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class UserStatisticDTO {
	id?: string;
	userId: string;
	completedCount?: number;
	hitCount?: number;
	errorCount?: number;
	createdAt?: string | Date;
	updatedAt?: string | Date;
	user: Prisma.UserCreateNestedOneWithoutUserStatisticsInput;
	longerDuration?: Prisma.CaseCreateNestedOneWithoutLongerDurationInput;
	shorterDuration?: Prisma.CaseCreateNestedOneWithoutShorterDurationInput;
}

export class CreateUserStatisticDTO extends OmitType(UserStatisticDTO, ['longerDuration', 'shorterDuration', 'user'] as const) {}
export class CaseOptionalFieldsDTO extends PartialType(CreateUserStatisticDTO) {}
