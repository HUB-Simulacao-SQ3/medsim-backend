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
			return new ApiResult({
				code: 0,
				success: true,
				data: patient,
			});
		} else {
			return new ApiResult({
				code: 0,
				success: false,
				data: patient,
			});
		}
	}

	@Post('patient')
	async findMany(@Body() data: any, @Request() request) {
		const patientFindMany = await this.patientsService.findOne(data, request['user']['id']);
		if (patientFindMany) {
			return new ApiResult({
				code: 0,
				success: true,
				data: patientFindMany,
			});
		} else {
			return new ApiResult({
				code: 0,
				success: false,
				data: patientFindMany,
			});
		}
	}

	@Get()
	async findAll(@Request() request) {
		const userId = request['user']['id'];
		const patientsFindAll = await this.patientsService.findAll(userId);
		if (patientsFindAll) {
			return new ApiResult({
				code: 0,
				success: true,
				data: patientsFindAll,
			});
		} else {
			return new ApiResult({
				code: 0,
				success: false,
				data: patientsFindAll,
			});
		}
	}

	@Get(':id')
	async findById(@Param('id') id: string, @Request() request) {
		const patientFindById = await this.patientsService.findOne({ id }, request['user']['id']);
		if (patientFindById) {
			return new ApiResult({
				code: 0,
				success: true,
				data: patientFindById,
			});
		} else {
			return new ApiResult({
				code: 0,
				success: false,
				data: patientFindById,
			});
		}
	}
}
