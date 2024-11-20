import { useState } from "react";

import { Page } from "../components/layout/Page";
import styles from "./QuestionSelection.module.css";
import {
  Box,
  Select,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  Checkbox,
  MenuItem,
  ListItemText,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";

export const QuestionSelection = () => {
  const stepGroups = [
    "1-10",
    "11-20",
    "21-30",
    "31-40",
    "41-50",
    "51-60",
    "61-70",
    "71-80",
    "81-90",
    "91-100",
    "101-110",
    "111-120",
    "121-130",
    "131-140",
    "141-150",
    "151-160",
    "161-170",
    "171-180",
    "181-190",
    "191-200",
    "201-210",
    "211-220",
    "221-230",
    "231-240",
    "241-250",
    "251-260",
    "261-270",
    "271-280",
    "281-290",
    "291-300",
    "301-310",
    "311-320",
    "321-330",
    "331-340",
    "341-350",
    "351-360",
    "361-370",
    "371-380",
    "381-390",
    "391-400",
    "401-410",
    "411-420",
    "421-430",
    "431-440",
    "441-450",
    "451-460",
    "461-470",
    "471-480",
    "481-490",
    "491-500",
  ];

  const categories = [
    "インフラ",
    "プログラミング",
    "ウェブシステム",
    "セキュリティ",
    "アーキテクティング",
    "AI/データサイエンス",
    "UI/UX",
    "ビジネススキル",
    "その他",
  ];

  const difficultyLevels = ["易しい", "普通", "難しい"];

  const numberOfQuestions = [5, 10, 15, 20, "全"];

  const [selectedSteps, setSelectedSteps] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedSteps>) => {
    const {
      target: { value },
    } = event;

    setSelectedSteps(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  return (
    <Page login={true}>
      <div className={styles.container}>
        <h2>出題範囲を選択</h2>
        <form action="">
          <div className="step">
            <h3>ステップで絞り込む（０つ以上選択）</h3>
            <FormControl sx={{ width: 500 }}>
              <InputLabel id="step-multiple-checkbox-label">Step</InputLabel>
              <Select
                labelId="step-multiple-checkbox-label"
                id="step-multiple-checkbox"
                multiple
                value={selectedSteps}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected: any) => selected.join(", ")}
              >
                {stepGroups.map((stepGroup) => (
                  <MenuItem key={stepGroup} value={stepGroup}>
                    <Checkbox checked={selectedSteps.includes(stepGroup)} />
                    <ListItemText primary={stepGroup} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <hr />
          </div>

          <div>
            <h3>カテゴリで絞り込む（０つ以上選択）</h3>
            {categories.map((category) => {
              return (
                <FormControlLabel
                  key={category}
                  control={<Checkbox />}
                  label={category}
                />
              );
            })}
            <hr />
          </div>

          <div className="difficulties">
            <h3>難易度で絞り込む（０つ以上選択）</h3>
            {difficultyLevels.map((difficultyLevel) => {
              return (
                <FormControlLabel
                  key={difficultyLevel}
                  control={<Checkbox />}
                  label={difficultyLevel}
                />
              );
            })}
            <hr />
          </div>

          <div className="numberOfQuestions">
            <h3>出題数（１つ選択）</h3>
            {numberOfQuestions.map((numberOfQuestion) => {
              return (
                <FormControlLabel
                  key={numberOfQuestion}
                  control={<Checkbox />}
                  label={`${numberOfQuestion}問`}
                />
              );
            })}
          </div>

          <Box className="startButton " textAlign="center" py={3}>
            <Button
              variant="contained"
              size="large"
              sx={{
                borderRadius: 50,
                alignItems: "center",
                backgroundColor: "#2563EB",
              }}
            >
              START
            </Button>
          </Box>
        </form>
      </div>
    </Page>
  );
};
