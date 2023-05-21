export type rollbackQuestionsType = {
	targetNode: string;
	sourceHandle: string;
};

export type alternativesType = {
	text: string;
	index: number;
};

export class QuestionDTO {
	nodeId: string;
	typeQuiz: {
		id: string;
	}[];
	question: string;
	correctAlternative: string;
	patientStatus: {
		temperature: string;
		bloodPressure: string;
		oxygenSaturation: string;
		pulse: string;
	};
	rollbackQuestions: rollbackQuestionsType[];
	alternatives: alternativesType[];
}
