import { useState } from "react";
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

import { Page } from "../../components/layout/Page";
import styles from "./QuestionSelection.module.css";
import { stepGroups } from "./selections/stepGroups";
import { categories } from "./selections/categories";
import { questionCounts } from "./selections/questionCounts";
import { difficultyLevels } from "./selections/difficultyLevels";

export const QuestionSelection = () => {


  const [selectedSteps, setSelectedSteps] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] =useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState("");

  // ステップの選択
  const handleSteps = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value;
    // `value` の型が文字列の配列であることを保証
    setSelectedSteps(Array.isArray(value) ? value : value.split(","));
  };

  // カテゴリの選択
  const handleCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedCategories((prevSelectedCategories) =>
      e.target.checked
        ? [...prevSelectedCategories, value] // チェックが入った場合は配列に追加
        : prevSelectedCategories.filter((category) => category !== value) // チェックが外れた場合は配列から削除
    );
  };

  const handleDifficulties = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedDifficulties((prevSelectedDifficulties) =>
      e.target.checked
        ? [...prevSelectedDifficulties, value] // チェックが入った場合は配列に追加
        : prevSelectedDifficulties.filter((difficulty) => difficulty !== value) // チェックが外れた場合は配列から削除
    );
  };

  // 問題数の選択
  const handleQuestionCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedQuestionCount(value); // チェックが入った場合に選択
    } else {
      setSelectedQuestionCount(""); // チェックが外れた場合は選択を解除
    }
  };

  // 絞り込み内容から演習問題をリクエスト
  const OnClickStartExercise = () => {
    console.log(selectedSteps);
    console.log(selectedCategories);
    console.log(selectedDifficulties);
    console.log(selectedQuestionCount);
  }

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
                onChange={handleSteps}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selectedSteps: string[]) => selectedSteps.join(", ")}
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
                  control={<Checkbox
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={handleCategories}
                    />}
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
                  control={<Checkbox 
                    value={difficultyLevel}
                    checked={selectedDifficulties.includes(difficultyLevel)}
                    onChange={handleDifficulties}
                    />}
                  label={difficultyLevel}
                />
              );
            })}
            <hr />
          </div>

          <div className="QuestionsCounts">
            <h3>出題数（１つ選択）</h3>
            {questionCounts.map((questionCount) => {
              return (
                <FormControlLabel
                  key={questionCount}
                  control={
                  <Checkbox 
                    value={questionCount.toString()}
                    checked={selectedQuestionCount===questionCount.toString()}
                    onChange={handleQuestionCount}/>}
                  label={`${questionCount}問`}
                />
              );
            })}
          </div>

          <Box className="startButton " textAlign="center" py={3}>
            <Button
              onClick={OnClickStartExercise}
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
