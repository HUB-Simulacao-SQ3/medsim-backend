import { Prisma } from '@prisma/client';
enum ContentCreatedByEnum {
	ALL = 'ALL',
	MY_CASES = 'MY_CASES',
	OTHERS = 'OTHERS',
}

type CaseDTO = Prisma.CaseUncheckedCreateInput & { contentCreatedBy?: ContentCreatedByEnum };

export { CaseDTO };
