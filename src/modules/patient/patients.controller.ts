import { Controller, Body, Post, Get, Param, Request } from '@nestjs/common';
import { PatientDTO } from './patients.dto';
import { PatientsService } from './patients.service';
import { ApiResult } from '../../core/api.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Patients')
@ApiBearerAuth()
@Controller('patients')
export class PatientsController {
	constructor(private patientsService: PatientsService) {}

	@Post()
	async create(@Body() data: PatientDTO, @Request() request) {
		data.userId = request['user']['id'];
		const patient = await this.patientsService.create(data);
		if (patient.id) {
			return ApiResult.response({
				data: patient,
			});
		} else {
			return ApiResult.response({
				data: patient,
			});
		}
	}

	@Post('patient')
	async findMany(@Body() data: any, @Request() request) {
		const patientFindMany = await this.patientsService.findOne(data, request['user']['id']);
		if (patientFindMany) {
			return ApiResult.response({
				data: patientFindMany,
			});
		} else {
			return ApiResult.response({
				data: patientFindMany,
			});
		}
	}

	@Get()
	async findAll(@Request() request) {
		const userId = request['user']['id'];
		const patientsFindAll = await this.patientsService.findAll(userId);
		if (patientsFindAll) {
			return ApiResult.response({
				data: patientsFindAll,
			});
		} else {
			return ApiResult.response({
				data: patientsFindAll,
			});
		}
	}

	@Get(':id')
	async findById(@Param('id') id: string, @Request() request) {
		const patientFindById = await this.patientsService.findOne({ id }, request['user']['id']);
		if (patientFindById) {
			return ApiResult.response({
				data: patientFindById,
			});
		} else {
			return ApiResult.response({
				data: patientFindById,
			});
		}
	}
}
