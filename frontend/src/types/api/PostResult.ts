// 問題演習での１問ごとにPOSTする回答結果

export type PostResult = {
  user_id:string|null,
  question_id:string|number,
  is_solved:boolean,
}; 