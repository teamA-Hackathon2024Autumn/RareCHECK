// 問題編集（受講生）

export type GetQuestionDetail = {
  step: number;
  question: string;
  // question_image:string,
  correct_option: string;
  wrong_option_1: string;
  wrong_option_2: string;
  explanation: string;
  // explanation_image:string,
  is_accept: boolean;
  difficulty: string;
  comment: string;
  has_comment: boolean;
  category_name: string;
};
