import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { PatientDTO } from './patients.dto';
import { PatientsService } from './patients.service';
import { Public } from '../auth/auth.guard';

@Controller('patients')
export class PatientsController {
	constructor(private patientsService: PatientsService) {}

	@Public()
	@Post()
	async create(@Body() user: PatientDTO) {
		return await this.patientsService.create(user);
	}

	@Post('patient')
	async findMany(@Body() data: any) {
		return await this.patientsService.findOne(data);
	}

	@Get()
	async findAll() {
		return await this.patientsService.findAll();
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.patientsService.findOne({ id });
	}
}
