// 編集してPostする問題（管理者）
export type PostQuestionEditAdmin = {
  step:number,
  question:string
  // question_image:string,
  correct_option:string,
  wrong_option_1:string,
  wrong_option_2:string,
  explanation:string,
  // explanation_image:string,
  is_accept:boolean,
  difficulty:string,
  comment:string,
  question_id:number,
  category_name:string,
};