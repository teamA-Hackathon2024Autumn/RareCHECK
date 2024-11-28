// 取得する演習問題

export type GetExercise = {
  id: number;
  question: string;
  options: string[];
  correct_option: string;
  explanation: string;
  // question_image: string,
  // explanation_image: string,
  category_name: string;
  step: number | string;
  difficulty: string;
};
