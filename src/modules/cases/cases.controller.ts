import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CasesService } from './cases.service';
import { Public } from '../auth/auth.guard';
import { CaseDTO } from './cases.dto';

@Controller('cases')
export class CasesController {
	constructor(private casesService: CasesService) {}

	@Public()
	@Post()
	async create(@Body() data: CaseDTO) {
		return await this.casesService.create(data);
	}

	@Post('case')
	async findManyWhere(@Body() data: CaseDTO) {
		return await this.casesService.findOne(data);
	}

	@Get()
	async findAll() {
		return await this.casesService.findAll();
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.casesService.findOne({ id });
	}
}
