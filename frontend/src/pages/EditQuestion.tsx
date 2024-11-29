import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Alert,
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
import styles from "./EditQuestion.module.css";
import { PostEdit } from "../types/api/PostEdit";

export const EditQuestion: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const questionId = location.state?.id;

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

  /*stateの初期値にするquizのデフォルト*/
  const defaultQuiz = {
    step: "",
    question: "",
    // question_image:string,
    correct_option: "",
    wrong_option_1: "",
    wrong_option_2: "",
    explanation: "",
    // explanation_image:string,
    is_accept: false,
    difficulty: "",
    comment: "",
    has_comment: false,
    category_name: "",
  };

  // /*1~500までの配列*/
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

  const [quiz, setQuiz] = useState(defaultQuiz);

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/rarecheck/questions/${questionId}/edit`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        );
        setQuiz(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data);
        }
      }
    };
    getQuiz();
  }, []);

  // 冗長なのでuseReduseで作った方がすっきりしそう
  const changeStep = (e: any) => {
    const newStep = { ...quiz, step: e.target.value };
    setQuiz(newStep);
  };

  const changeCategory = (e: any) => {
    const newCategory = { ...quiz, category_name: e.target.value };
    setQuiz(newCategory);
  };

  const changeQuestion = (e: any) => {
    const newQuestion = { ...quiz, question: e.target.value };
    setQuiz(newQuestion);
  };

  // const changeQestionImage = (e:any) => {
  //   const newQuestionImage = {...quiz, questionImage: e.target.value};
  //   setQuiz(newQuestionImage);
  // }

  const changeExplanation = (e: any) => {
    const newExplanation = { ...quiz, explanation: e.target.value };
    setQuiz(newExplanation);
  };

  // const changeExplanationImage = (e:any) => {
  //   const newcExplanationImage = {...quiz, explanationImage: e.target.value};
  //   setQuiz(newcExplanationImage);
  // }

  const changeCorrectAnswer = (e: any) => {
    const newCorrectAnswer = { ...quiz, correct_option: e.target.value };
    setQuiz(newCorrectAnswer);
  };

  const changeWrongAnswer1 = (e: any) => {
    const newWrongAnswer1 = { ...quiz, wrong_option_1: e.target.value };
    setQuiz(newWrongAnswer1);
  };

  const changeWrongAnswer2 = (e: any) => {
    const newWrongAnswer2 = { ...quiz, wrong_option_2: e.target.value };
    setQuiz(newWrongAnswer2);
  };

  // 編集した問題をPOST
  const handleEditQuestion = () => {
    const editQuiz = {
      step: quiz.step,
      question: quiz.question,
      // question_image:quiz.question_image,
      correct_option: quiz.correct_option,
      wrong_option_1: quiz.wrong_option_1,
      wrong_option_2: quiz.wrong_option_2,
      explanation: quiz.explanation,
      // explanation_image:quiz.explanation_image,
      category_name: quiz.category_name,
    };
    const postEditQuestion = async (editQuiz: PostEdit) => {
      try {
        await axios.put(
          `http://localhost:5000/rarecheck/questions/${questionId}/edit`,
          editQuiz, // POSTのボディ（送信するデータ）
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
    postEditQuestion(editQuiz);
    console.log(editQuiz);

    navigate("/createdquestionlist");
  };

  return (
    <Page login={true}>
      <div className={styles.container}>
        <h3>問題を確認・編集する</h3>
        <form>
          {/* 2カラムにするためのコンテナ */}
          <div className={styles.twoColumnLayout}>
            {/*　左列のレイアウト */}
            <Stack spacing={2} className={styles.leftColumnLayout}>
              <div className={styles.formscolumn}>
                <Stack spacing={2}>
                  {/*ステップ選択：０または１つ選択 */}
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
                        onChange={changeStep}
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
                        label="Category"
                        onChange={changeCategory}
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
                  {/* 問題編集*/}
                  <div className="questionAndImage">
                    <TextField
                      sx={{ width: "100%" }}
                      id="outlined-multiline-static"
                      label="問題"
                      multiline
                      rows={4}
                      variant="outlined"
                      value={quiz.question}
                      onChange={changeQuestion}
                    />
                    {/* 問題用画像のアップロード （未実装）*/}
                    {/* <div>
                      <Button variant="contained" size="small" color="inherit">
                        問題用画像を更新
                        <CollectionsIcon />
                      </Button>
                    </div> */}
                  </div>
                  {/* 選択肢編集 */}
                  <Stack spacing={2} className="options">
                    <TextField
                      label="◯ 正解の選択肢"
                      value={quiz.correct_option}
                      onChange={changeCorrectAnswer}
                    />
                    <TextField
                      label="✕ 不正解の選択肢１"
                      value={quiz.wrong_option_1}
                      onChange={changeWrongAnswer1}
                    />
                    <TextField
                      label="✕ 不正解の選択肢２"
                      value={quiz.wrong_option_2}
                      onChange={changeWrongAnswer2}
                    />
                  </Stack>
                  {/* 解説編集 */}
                  <div className="explanationAndImage">
                    <TextField
                      sx={{ width: "100%" }}
                      id="outlined-multiline-static"
                      label="解説"
                      multiline
                      rows={4}
                      variant="outlined"
                      value={quiz.explanation}
                      onChange={changeExplanation}
                    />
                    {/* 解説用画像のアップロード（未実装） */}
                    {/* <div>
                      <Button variant="contained" size="small" color="inherit">
                        解説用画像を更新
                        <CollectionsIcon />
                      </Button>
                    </div> */}
                  </div>
                </Stack>
              </div>
            </Stack>
            {/* 右列のレイアウト */}
            <div className={styles.rightColumnLayout}>
              <Alert severity="info">
                <b>管理者からのコメント</b>
                <p>{quiz.comment}</p>
              </Alert>
            </div>
          </div>
          {/* 保存ボタン （未実装）*/}
          <Box className="startButton" textAlign="center" py={3}>
            <Button
              onClick={handleEditQuestion}
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
        </form>
      </div>
    </Page>
  );
};
