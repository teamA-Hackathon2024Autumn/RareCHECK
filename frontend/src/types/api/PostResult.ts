// 問題演習での１問ごとにPOSTする回答結果

export type PostResult = {
  user_id:number,
  question_id:number,
  is_solved:boolean,
}; 