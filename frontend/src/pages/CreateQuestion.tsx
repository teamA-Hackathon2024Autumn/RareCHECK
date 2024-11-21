import { useState } from "react";

import { Page } from "../components/layout/Page";
import styles from "./CreateQuestion.module.css";
import {
  Stack,
  TextField,
  Box,
  Select,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";

export const CreateQuestion: React.FC = () => {
  /*stetの初期値にするquizのデフォルト*/
  const defaultQuiz = {
    step: "",
    category: "",
    question: "",
    questionImage: "",
    correctAnswer: "",
    wrongAnswer1: "",
    wrongAnswer2: "",
    explanation: "",
    explanationImage: "",
  };
  /*1~500までの配列*/
  const steps = Array.from({ length: 500 }, (_, i) => (i + 1).toString());

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

  const [quiz, setQuiz] = useState(defaultQuiz);

  const selectStep = (e: any) => {
    const newStep = { ...quiz, step: e.target.value };
    setQuiz(newStep);
  };

  const selectCategory = (e: any) => {
    const newCategory = { ...quiz, category: e.target.value };
    setQuiz(newCategory);
  };

  return (
    <Page login={true}>
      <div className={styles.container}>
        <h3>問題を新規作成</h3>
        <form>
          <div className={styles.formscolumn}>
            <Stack spacing={2}>
              {/*ステップ選択：０または１つ選択 */}
              <div className={styles.selectformLayout}>
                <FormControl fullWidth>
                  <InputLabel id="step-select-label">
                    ステップ（０または１つ選択）
                  </InputLabel>
                  <Select
                    labelId="step-select-label"
                    id="step-select"
                    value={quiz.step}
                    label="Step"
                    defaultValue=""
                    onChange={selectStep}
                  >
                    {steps.map((step) => {
                      return (
                        <MenuItem key={step} value={step}>
                          {step}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {/*カテゴリ：１つ選択 */}
                <FormControl fullWidth>
                  <InputLabel id="step-select-label">
                    カテゴリ（１つ選択）
                  </InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={quiz.category}
                    label="Step"
                    onChange={selectCategory}
                  >
                    {categories.map((category) => {
                      return (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              {/* 問題*/}
              <div>
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-static"
                  label="問題"
                  multiline
                  rows={4}
                  defaultValue="Default Value"
                  variant="outlined"
                />
                {/* 問題用画像のアップロード */}
                <div>
                  <Button variant="contained" size="small" color="inherit">
                    問題用画像をアップロード
                    <CollectionsIcon />
                  </Button>
                </div>
              </div>
              {/* 選択肢 */}
              <Stack spacing={2}>
                <TextField label="正解の選択肢" variant="outlined" />
                <TextField label="不正解の選択肢１" variant="outlined" />
                <TextField label="不正解の選択肢２" variant="outlined" />
              </Stack>
              {/* 解説 */}
              <div>
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-static"
                  label="問題"
                  multiline
                  rows={4}
                  defaultValue="Default Value"
                  variant="outlined"
                />
                {/* 解説用画像のアップロード */}
                <div>
                  <Button variant="contained" size="small" color="inherit">
                    解説用画像をアップロード
                    <CollectionsIcon />
                  </Button>
                </div>
              </div>
              {/* 送信ボタン */}
              <Box className="saveButton " textAlign="center" py={3}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: 50,
                    alignItems: "center",
                    backgroundColor: "#2563EB",
                  }}
                >
                  保存
                </Button>
              </Box>
            </Stack>
          </div>
        </form>
      </div>
    </Page>
  );
};
