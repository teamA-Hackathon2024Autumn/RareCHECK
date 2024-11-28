export type AllExerciseResult = {
  question: string;
  selectedOption: string;
  correctAnswer: string;
  id: number;
  isCorrect: boolean;
  category: string;
  difficulty: string;
  step: string | number;
};
