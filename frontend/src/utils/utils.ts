// 今日の日付から 2週間 × セット数 取得する関数
export const getTwoWeekPeriods = (sets: number) => {
  const result = [];
  const today = new Date();

  // 開始日を今日の日付から 2週間 × セット数 分戻る
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 14 * sets);

  for (let i = 0; i < sets; i++) {
    const start = new Date(startDate);
    const end = new Date(startDate);

    // 期間の開始と終了を設定
    end.setDate(start.getDate() + 13);

    // 日付を "YYYY/MM/DD" 形式でフォーマット
    const formatDate = (date: Date) =>
      `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;

    result.push(`${formatDate(start)}~${formatDate(end)}`);

    // 次の2週間分に進める
    startDate.setDate(startDate.getDate() + 14);
  }

  return result;
};
