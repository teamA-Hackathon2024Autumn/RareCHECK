// 編集してPostする問題（管理者）
export type PostFeedback = {
  id: number | string;
  difficulty: number | string;
  is_accept: boolean;
  step: number | string;
  category_name: string;
  question: string;
  // question_image: string;
  correct_option: string;
  wrong_option_1: string;
  wrong_option_2: string;
  explanation: string;
  // explanation_image: string;
  comment: string;
};
