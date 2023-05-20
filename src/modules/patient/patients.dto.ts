import { OmitType, PartialType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class PatientDTO {
	id?: string;

	@IsNotEmpty({ message: 'É necessário informar o firstName' })
	firstName: string;
	@IsNotEmpty({ message: 'É necessário informar o lastName' })
	lastName: string;
	@IsNotEmpty({ message: 'É necessário informar o userId' })
	userId: string;
	@IsNotEmpty({ message: 'É necessário informar o birthday' })
	birthday: string;
	@IsNotEmpty({ message: 'É necessário informar o profession' })
	profession: string;
	@IsNotEmpty({ message: 'É necessário informar o height' })
	height: string;
	@IsNotEmpty({ message: 'É necessário informar o weight' })
	weight: string;
	@IsNotEmpty({ message: 'É necessário informar o chiefComplaint' })
	chiefComplaint: string;

	image?: Buffer;
	createdAt?: string | Date;
	updatedAt?: string | Date;
	Case?: Prisma.CaseUncheckedCreateNestedManyWithoutPatientInput;
}

export class CreatePatientDTO extends OmitType(PatientDTO, ['createdAt', 'updatedAt', 'Case', 'image'] as const) {}
export class PatientOptionalFieldsDTO extends PartialType(CreatePatientDTO) {}
