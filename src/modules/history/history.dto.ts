import { OmitType } from '@nestjs/swagger';
import { QuestionDTO } from '../../core/question.dto';

export class CaseUserHistoryDTO {
	userId: string;
	caseId: string;
	history: any;
}

export class CaseUserHistoryOptionalFieldsDTO extends OmitType(CaseUserHistoryDTO, ['history'] as const) {}
