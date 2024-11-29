import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { categoryGroup } from "./selections/categoryGroup";
import { questionCounts } from "./selections/questionCounts";
import { difficultyLevels } from "./selections/difficultyLevels";

// 関数を別のファイルからインポート
import {
  convertStepRangeToList,
  convertDifficultyToNumber,
} from "../../services/convertFunctions";

export const QuestionSelection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem("rarecheck-username");
    const storedUserIsAdmin = localStorage.getItem("rarecheck-isAdmin");

    if (storedUserIsAdmin === "true") {
      navigate("/admin-home");
    }
    if (storedUserName === null) {
      navigate("/login");
    }
  }, [navigate]);

  const [filter, setFilter] = useState({
    step_ranges: [] as string[],
    difficulty: [] as string[],
    categories: [] as string[],
    question_count: "" as string,
  });

  const handleSteps = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value;
    setFilter((prev) => ({
      ...prev,
      step_ranges: Array.isArray(value) ? value : value.split(","),
    }));
  };

  const handleCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter((prev) => ({
      ...prev,
      categories: e.target.checked
        ? [...prev.categories, value]
        : prev.categories.filter((category) => category !== value),
    }));
  };

  const handleDifficulties = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter((prev) => ({
      ...prev,
      difficulty: e.target.checked
        ? [...prev.difficulty, value]
        : prev.difficulty.filter((difficulty) => difficulty !== value),
    }));
  };

  const handleQuestionCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter((prev) => ({
      ...prev,
      question_count: e.target.checked ? value : "",
    }));
  };

  const OnClickStartExercise = () => {
    // ステップ範囲の変換
    const stepRanges = filter.step_ranges.map((range) =>
      convertStepRangeToList(range),
    );

    // 難易度の変換
    const difficultyNumbers = filter.difficulty.map(convertDifficultyToNumber);

    // 問題数の変換
    let questionCount: number | string = filter.question_count;
    if (questionCount === "全") {
      questionCount = 9999;
    } else {
      questionCount = parseInt(questionCount, 10);
    }

    // APIリクエスト用のオブジェクトを作成
    const requestPayload = {
      step_ranges: stepRanges,
      difficulty: difficultyNumbers,
      categories: filter.categories,
      question_count: questionCount,
    };

    console.log(requestPayload);
    navigate("/exercise", { state: requestPayload });
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
                value={filter.step_ranges}
                onChange={handleSteps}
                input={<OutlinedInput label="Tag" />}
                renderValue={(step_ranges) => step_ranges.join(", ")}
              >
                {stepGroups.map((stepGroup) => (
                  <MenuItem key={stepGroup} value={stepGroup}>
                    <Checkbox
                      checked={filter.step_ranges.includes(stepGroup)}
                    />
                    <ListItemText primary={stepGroup} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <hr />
          </div>

          <div>
            <h3>カテゴリで絞り込む（０つ以上選択）</h3>
            {categoryGroup.map((category) => {
              return (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      value={category}
                      checked={filter.categories.includes(category)}
                      onChange={handleCategories}
                    />
                  }
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
                  control={
                    <Checkbox
                      value={difficultyLevel}
                      checked={filter.difficulty.includes(difficultyLevel)}
                      onChange={handleDifficulties}
                    />
                  }
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
                      checked={
                        filter.question_count === questionCount.toString()
                      }
                      onChange={handleQuestionCount}
                    />
                  }
                  label={`${questionCount}問`}
                />
              );
            })}
            <FormControlLabel
              control={
                <Checkbox
                  value="全"
                  checked={filter.question_count === "全"}
                  onChange={handleQuestionCount}
                />
              }
              label="全問"
            />
          </div>

          <Box className="startButton" textAlign="center" py={3}>
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
