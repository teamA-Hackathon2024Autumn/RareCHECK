export type RequestExercise = {
  step_ranges: number[] | null; //1-10と11-20だったら[[1,10],[11-20]]のように格納
  difficulty: number[] | null; //易しい、普通、難しい　=> 　1,2,3に変換
  categories: string[] | null;
  question_count: number; //5,10,15,20,全　全は数字に変換しないといけない…
};
