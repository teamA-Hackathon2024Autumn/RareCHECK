// 取得する確認待ち問題一覧＆すべての問題一覧(admin)

export type GetQuestionListAdmin = {
  id: number | string;
  username: string;
  question: string;
  step: number | string;
  category_name: string;
};
