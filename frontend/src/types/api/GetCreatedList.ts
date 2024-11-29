// 取得する作成済み問題一覧
export type GetCreatedList = {
  id: number | string;
  question: string;
  step: number | string;
  category_name: string;
  created_at: string;
  has_comment: boolean;
  is_accept: boolean;
};
