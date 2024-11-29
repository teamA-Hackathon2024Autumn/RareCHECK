// ステップを範囲表記から始まりと終わりのステップのみに変換する関数
export const convertStepRangeToList = (stepRange: string): [number, number] => {
  const [start, end] = stepRange.split("-").map(Number);
  return [start, end]; // 配列として開始と終了の数値を返す
};

// 難易度を数字に変換する関数
export const convertDifficultyToNumber = (difficulty: string): number => {
  switch (difficulty) {
    case "易しい":
      return 1;
    case "普通":
      return 2;
    case "難しい":
      return 3;
    default:
      return 0; // デフォルト値として0を返す
  }
};
