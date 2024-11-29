import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
// import CollectionsIcon from "@mui/icons-material/Collections";

import { Page } from "../components/layout/Page";
import styles from "./CreateQuestion.module.css";
import { PostCreate } from "../types/api/PostCreate";

export const CreateQuestion: React.FC = () => {
  const navigate = useNavigate();
  const storedUserId = localStorage.getItem("rarecheck-userId");

  // ログイン状態の確認
  useEffect(() => {
    // ローカルストレージからユーザー名と管理者権限を取得、ログイン状態を確認
    const storedUserName = localStorage.getItem("rarecheck-username");
    const storedUserIsAdmin = localStorage.getItem("rarecheck-isAdmin");

    if (storedUserIsAdmin === "true") {
      navigate("/admin-home");
    }
    if (storedUserName === null) {
      navigate("/login");
    }
  }, [navigate]);

  const defaultQuiz = {
    step: "",
    question: "",
    // question_image:string,
    correct_option: "",
    wrong_option_1: "",
    wrong_option_2: "",
    explanation: "",
    // explanation_image:string,
    user_id: storedUserId,
    category_name: "",
  };
  /*1~500までの配列*/
  // const steps = Array.from({ length: 500 }, (_, i) => (i + 1).toString());

  /*0~500までの配列 */
  const steps = Array.from({ length: 501 }, (_, i) => i);

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

  const [quiz, setQuiz] = useState<PostCreate>(defaultQuiz);

  // ステップの選択
  const selectStep = (e: any) => {
    const newStep = { ...quiz, step: e.target.value };
    setQuiz(newStep);
  };

  // カテゴリの選択
  const selectCategory = (e: any) => {
    const newCategory = { ...quiz, category_name: e.target.value };
    setQuiz(newCategory);
  };

  // 問題の入力
  const handleQuestion = (e: any) => {
    const newQuestion = { ...quiz, question: e.target.value };
    setQuiz(newQuestion);
  };
  // 解説の入力
  const handleExplanation = (e: any) => {
    const newExplanation = { ...quiz, explanation: e.target.value };
    setQuiz(newExplanation);
  };
  // 選択肢の入力
  const handleCorrectOption = (e: any) => {
    const newCorrectOption = { ...quiz, correct_option: e.target.value };
    setQuiz(newCorrectOption);
  };
  const handleWrongOption1 = (e: any) => {
    const newWrongOption1 = { ...quiz, wrong_option_1: e.target.value };
    setQuiz(newWrongOption1);
  };
  const handleWrongOption2 = (e: any) => {
    const newWrongOption2 = { ...quiz, wrong_option_2: e.target.value };
    setQuiz(newWrongOption2);
  };

  // 保存ボタンクリック後、stateの情報をAPIに送信、作成済み問題一覧へ遷移
  const handleCreateQuestion = () => {
    const postCreateQuestion = async (quiz: PostCreate) => {
      try {
        await axios.post(
          `http://localhost:5000/rarecheck/questions/create`,
          quiz, // POSTのボディ（送信するデータ）
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // セッション管理に必要
          },
        );
        console.log("post completed!");
      } catch (error) {
        console.error("Error saving result:", error);
      }
    };
    postCreateQuestion(quiz);

    navigate("/createdquestionlist");
  };

  return (
    <Page login={true}>
      <div className={styles.container}>
        <h3>問題を新規作成</h3>
        <form>
          <div className={styles.formscolumn}>
            <Stack spacing={2}>
              {/*ステップ選択：１つ選択 */}
              <div className={styles.selectformLayout}>
                <FormControl fullWidth>
                  <InputLabel id="step-select-label">
                    ステップ（該当なしは０を選択）
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
                    value={quiz.category_name}
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
                  value={quiz.question}
                  variant="outlined"
                  onChange={handleQuestion}
                />
                {/* 問題用画像のアップロード */}
                {/* <div>
                  <Button variant="contained" size="small" color="inherit">
                    問題用画像をアップロード
                    <CollectionsIcon />
                  </Button>
                </div> */}
              </div>
              {/* 選択肢 */}
              <Stack spacing={2}>
                <TextField
                  label="正解の選択肢"
                  variant="outlined"
                  onChange={handleCorrectOption}
                />
                <TextField
                  label="不正解の選択肢１"
                  variant="outlined"
                  onChange={handleWrongOption1}
                />
                <TextField
                  label="不正解の選択肢２"
                  variant="outlined"
                  onChange={handleWrongOption2}
                />
              </Stack>
              {/* 解説 */}
              <div>
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-static"
                  label="解説"
                  multiline
                  rows={4}
                  value={quiz.explanation}
                  variant="outlined"
                  onChange={handleExplanation}
                />
                {/* 解説用画像のアップロード */}
                {/* <div>
                  <Button variant="contained" size="small" color="inherit">
                    解説用画像をアップロード
                    <CollectionsIcon />
                  </Button>
                </div> */}
              </div>
              {/* 送信ボタン */}
              <Box className="saveButton " textAlign="center" py={3}>
                <Button
                  onClick={handleCreateQuestion}
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
