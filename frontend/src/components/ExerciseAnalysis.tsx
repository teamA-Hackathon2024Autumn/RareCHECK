import { BarChart } from "@mui/x-charts/BarChart";
import { Typography } from "@mui/material";
import styles from "./ExerciseAnalysis.module.css";
// import { getTwoWeekPeriods } from "../utils/utils";

export type TwoWeekData = {
  start_date: string;
  end_date: string;
  total_questions: number;
  total_correct: number;
  correct_percentage: number;
};

export type ExerciseAnalysisData = {
  first_two_week: TwoWeekData;
  second_two_week: TwoWeekData;
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

  const checkYear = (
    start_date: string | undefined,
    end_date: string | undefined,
  ) => {
    if (start_date != undefined && end_date != undefined) {
      if (start_date.substring(0, 4) === end_date.substring(0, 4)) {
        return start_date + "~" + end_date.substring(5, end_date.length);
      } else {
        return start_date + "~" + end_date;
      }
    } else {
      return "";
    }
  };

  const first_two_week = checkYear(
    exerciseAnalysisData?.first_two_week.start_date,
    exerciseAnalysisData?.first_two_week.end_date,
  );

  const second_tow_week = checkYear(
    exerciseAnalysisData?.second_two_week.start_date,
    exerciseAnalysisData?.second_two_week.end_date,
  );

  return (
    <>
      <Typography variant="h6" className={styles.leftAlignedText}>
        学習状況
      </Typography>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: [second_tow_week, first_two_week],
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
              exerciseAnalysisData?.second_two_week.total_questions ?? 0,
              exerciseAnalysisData?.first_two_week.total_questions ?? 0,
            ],
            label: "演習数",
          },
          {
            data: [
              exerciseAnalysisData?.second_two_week.total_correct ?? 0,
              exerciseAnalysisData?.first_two_week.total_correct ?? 0,
            ],
            label: "正答数",
          },
          {
            data: [
              exerciseAnalysisData?.second_two_week.correct_percentage ?? 0,
              exerciseAnalysisData?.first_two_week.correct_percentage ?? 0,
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
