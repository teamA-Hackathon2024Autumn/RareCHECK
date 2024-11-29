// 問題作成

export type PostEdit = {
  step: number | string;
  question: string;
  // question_image:string,
  correct_option: string;
  wrong_option_1: string;
  wrong_option_2: string;
  explanation: string;
  // explanation_image:string,
  category_name: string;
};
