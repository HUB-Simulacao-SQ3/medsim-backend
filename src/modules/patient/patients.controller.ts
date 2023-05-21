import { Controller, Body, Post, Get, Param, Request, Query } from '@nestjs/common';
import { CreatePatientDTO, PatientOptionalFieldsDTO } from './patients.dto';
import { PatientsService } from './patients.service';
import { ApiResult } from '../../core/api.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Patients')
@ApiBearerAuth()
@Controller('patients')
export class PatientsController {
	constructor(private patientsService: PatientsService) {}

	@Post()
	async create(@Body() data: CreatePatientDTO, @Request() request) {
		data.userId = request?.user?.id;
		const patient = await this.patientsService.create(data);
		if (patient.id) {
			return ApiResult.result({
				data: patient,
			});
		} else {
			return ApiResult.result({
				data: patient,
			});
		}
	}

	@Get('filter')
	async findMany(@Query() data: PatientOptionalFieldsDTO, @Request() request) {
		const patientFindMany = await this.patientsService.findManyWhere(data, request?.user?.id);
		if (patientFindMany) {
			return ApiResult.result({
				data: patientFindMany,
			});
		} else {
			return ApiResult.result({
				data: patientFindMany,
			});
		}
	}

	@Get()
	async findAll(@Request() request) {
		const userId = request?.user?.id;
		const patientsFindAll = await this.patientsService.findAll(userId);
		if (patientsFindAll) {
			return ApiResult.result({
				data: patientsFindAll,
			});
		} else {
			return ApiResult.result({
				data: patientsFindAll,
			});
		}
	}

	@Get(':id')
	async findById(@Param('id') id: string, @Request() request) {
		const patientFindById = await this.patientsService.findOne({ id }, request?.user?.id);
		if (patientFindById) {
			return ApiResult.result({
				data: patientFindById,
			});
		} else {
			return ApiResult.result({
				data: patientFindById,
			});
		}
	}
}
