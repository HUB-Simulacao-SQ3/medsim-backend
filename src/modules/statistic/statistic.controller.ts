import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { HistoryService } from '../history/history.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { StatisticService } from './statistic.service';
import { ApiResult } from '../../core/api.dto';

@ApiBearerAuth()
@Controller('statistic')
export class StatisticController {
	constructor(private statisticsService: StatisticService, private historyService: HistoryService) {}

	@Get('filter')
	async getStatistic(@Request() request, @Query() query) {
		const userId = request.user.id;
		if (Object.keys(query).length > 0) {
			query.userId = userId;
			const statisticFiltered = await this.statisticsService.getFilter({ userId, ...query });
			if (statisticFiltered) {
				return ApiResult.result({ data: statisticFiltered });
			} else {
				return ApiResult.result({ data: statisticFiltered });
			}
		} else {
			return this.findUniqueUserId(request);
		}
	}

	@Post('statistic')
	async creteOrUpdate(@Request() request, @Body() body) {
		const userId = request.user.id;

		const statistic = await this.statisticsService.createOrUpdate({ userId, ...body });

		if (statistic?.id) {
			return ApiResult.result({ data: statistic });
		} else {
			return ApiResult.result({ data: statistic });
		}
	}

	@Get('statistic')
	async findOne(@Request() request) {
		const userId = request.user.id;
		const userStatistics = await this.statisticsService.findAll({ userId });
		if (userStatistics) {
			return ApiResult.result({ data: userStatistics });
		} else {
			return ApiResult.result({ data: userStatistics });
		}
	}

	@Get('statistic/user/:userId')
	async findUniqueUserId(@Request() request) {
		const userId = request.user.id;
		const userStatistics = await this.statisticsService.findUniqueUserId({ userId });
		if (userStatistics) {
			return ApiResult.result({ data: userStatistics });
		} else {
			return ApiResult.result({ data: userStatistics });
		}
	}
}
