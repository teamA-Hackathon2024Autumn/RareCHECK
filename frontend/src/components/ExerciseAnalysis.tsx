import { BarChart } from "@mui/x-charts/BarChart";
import { Typography } from "@mui/material";
import styles from "./ExerciseAnalysis.module.css";
import { getTwoWeekPeriods } from "../utils/utils";

export type TwoWeekData = {
  total_questions: number;
  total_correct: number;
  correct_percentage: number;
};

export type ExerciseAnalysisData = {
  first_2week: TwoWeekData;
  second_2week: TwoWeekData;
  // third_2week: TwoWeekData;
  // fourth_2week: TwoWeekData;
};

type ExerciseAnalysisProps = {
  exerciseAnalysisData: ExerciseAnalysisData | null;
};

const valueFormatter = (value: number | null) => {
  return `${value}%`;
};

export const ExerciseAnalysis = ({
  exerciseAnalysisData,
}: ExerciseAnalysisProps) => {
  if (exerciseAnalysisData === null) {
    <Typography variant="h6" className={styles.leftAlignedText}>
      学習状況に関するデータが取得できませんでした。
    </Typography>;
  }

  const set = 2; // 2週間を何セット取得するか指定
  const xAxisData = getTwoWeekPeriods(set);

  return (
    <>
      <Typography variant="h6" className={styles.leftAlignedText}>
        学習状況
      </Typography>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: xAxisData,
          },
        ]}
        yAxis={[
          {
            id: "left-axis",
            label: "問題数",
          },
          {
            id: "right-axis",
            label: "正答率 (%)",
            position: "right",
            min: 0,
            max: 100,
          },
        ]}
        // undefined を 0 に置き換える
        series={[
          {
            data: [
              exerciseAnalysisData?.first_2week.total_questions ?? 0,
              exerciseAnalysisData?.second_2week.total_questions ?? 0,
            ],
            label: "演習数",
          },
          {
            data: [
              exerciseAnalysisData?.first_2week.total_correct ?? 0,
              exerciseAnalysisData?.second_2week.total_correct ?? 0,
            ],
            label: "正答数",
          },
          {
            data: [
              exerciseAnalysisData?.first_2week.correct_percentage ?? 0,
              exerciseAnalysisData?.second_2week.correct_percentage ?? 0,
            ],
            label: "正答率",
            yAxisKey: "right-axis",
            valueFormatter,
          },
        ]}
        height={400}
      />
    </>
  );
};
