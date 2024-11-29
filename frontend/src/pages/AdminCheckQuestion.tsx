import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Box,
  Select,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
/* import { CollectionsFilled } from '@mui/icons-material'; */

import { Page } from "../components/layout/Page";
import styles from "./AdminCheckQuestion.module.css";
import { PostFeedback } from "../types/api/PostFeedback";
import { GetQuestionDetailAdmin } from "../types/api/GetQuestionDetailAdmin";

export const AdminCheckQuestion: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const questionId = location.state?.id;

  /*stateの初期値にするquizのデフォルト*/
  const defaultQuiz: GetQuestionDetailAdmin = {
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
    id: "",
    category_name: "",
  };

  const [quiz, setQuiz] = useState<GetQuestionDetailAdmin>(defaultQuiz);

  useEffect(() => {
    const storedUserName = localStorage.getItem("rarecheck-username");
    const storedUserIsAdmin = localStorage.getItem("rarecheck-isAdmin");

    if (storedUserIsAdmin === "false") {
      navigate("/");
    }
    if (storedUserName === null) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/rarecheck/admin/question/${questionId}`,
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

  const changeDifficulty = (e: any) => {
    const newDifficulty = { ...quiz, difficulty: e.target.value };
    setQuiz(newDifficulty);
  };

  const changeComment = (e: any) => {
    const newComment = { ...quiz, comment: e.target.value };
    setQuiz(newComment);
  };

  const changeIsAccepted = () => {
    const reverseIsAccepted = !quiz.is_accept;
    const newIsAccepted = { ...quiz, is_accept: reverseIsAccepted };
    console.log(reverseIsAccepted);
    setQuiz(newIsAccepted);
  };

  const getDifficultyLabel = (difficulty: number | string): string => {
    switch (difficulty) {
      case 1:
        return "易しい";
      case 2:
        return "普通";
      case 3:
        return "難しい";
      default:
        return "未設定"; // `difficulty`が1, 2, 3以外の場合は「未設定」
    }
  };

  // 保存
  const handleSubmit = () => {
    const feedbackQuiz: PostFeedback = {
      id: quiz.id,
      step: quiz.step,
      difficulty: quiz.difficulty,
      category_name: quiz.category_name,
      question: quiz.question,
      // question_image: string,
      correct_option: quiz.correct_option,
      wrong_option_1: quiz.wrong_option_1,
      wrong_option_2: quiz.wrong_option_2,
      explanation: quiz.explanation,
      // explanation_image: quiz.explanation_image,
      comment: quiz.comment,
      is_accept: quiz.is_accept,
    };
    const postFeedbackQuestion = async (feedback: PostFeedback) => {
      try {
        await axios.put(
          `http://localhost:5000/rarecheck/admin/question/${questionId}`,
          feedback, // POSTのボディ（送信するデータ）
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
    postFeedbackQuestion(feedbackQuiz);
    console.log(feedbackQuiz);

    navigate("/questionsawaitingcheck");
  };

  return (
    <Page login={true}>
      <div className={styles.container}>
        <div>
          <h3>問題を確認する</h3>
        </div>
        <div className="questionStatus">
          <>問題ID: {quiz.id}</>
          <p>難易度: {getDifficultyLabel(quiz.difficulty)}</p>
          <p>問題掲載: {quiz.is_accept ? "承認" : "未承認"}</p>
        </div>
        <form>
          {/* 2カラムにするためのコンテナ */}
          <div className={styles.twoColumnLayout}>
            {/*　左列のレイアウト */}
            <Stack spacing={2} className={styles.leftColumnLayout}>
              <div className={styles.formscolumn}>
                <Stack spacing={2}>
                  <div className={styles.selectformLayout}>
                    {/*ステップの表示 */}
                    <TextField
                      fullWidth
                      value={quiz.step}
                      label="Step"
                      variant="filled"
                      slotProps={{
                        input: {
                          readOnly: true,
                        },
                      }}
                    ></TextField>
                    {/*カテゴリの表示 */}
                    <TextField
                      fullWidth
                      value={quiz.category_name}
                      label="Category"
                      variant="filled"
                      slotProps={{
                        input: {
                          readOnly: true,
                        },
                      }}
                    ></TextField>
                  </div>
                  <div className="questionAndImage">
                    {/* 問題の表示*/}
                    <TextField
                      sx={{ width: "100%" }}
                      id="outlined-multiline-static"
                      label="問題"
                      multiline
                      rows={4}
                      value={quiz.question}
                      variant="filled"
                      slotProps={{
                        input: {
                          readOnly: true,
                        },
                      }}
                    />
                    {/* 問題用画像の表示*/}
                    {/* <div>
                      <img src={quiz.questionImage} alt="" />
                    </div> */}
                  </div>
                  {/* 選択肢の表示 */}
                  <Stack spacing={2} className="options">
                    <TextField
                      label="◯ 正解の選択肢"
                      value={quiz.correct_option}
                      variant="filled"
                      slotProps={{
                        input: {
                          readOnly: true,
                        },
                      }}
                    />
                    <TextField
                      label="✕ 不正解の選択肢１"
                      value={quiz.wrong_option_1}
                      variant="filled"
                      slotProps={{
                        input: {
                          readOnly: true,
                        },
                      }}
                    />
                    <TextField
                      label="✕ 不正解の選択肢２"
                      value={quiz.wrong_option_2}
                      variant="filled"
                      slotProps={{
                        input: {
                          readOnly: true,
                        },
                      }}
                    />
                  </Stack>
                  {/* 解説の表示 */}
                  <div className="explanationAndImage">
                    <TextField
                      sx={{ width: "100%" }}
                      id="outlined-multiline-static"
                      label="解説"
                      multiline
                      rows={4}
                      value={quiz.explanation}
                      variant="filled"
                      slotProps={{
                        input: {
                          readOnly: true,
                        },
                      }}
                    />
                    {/* 解説用画像の表示 */}
                    {/* <div>
                      <img src={quiz.explanationImage} alt="" />
                    </div> */}
                  </div>
                </Stack>
              </div>
            </Stack>
            {/* 右列のレイアウト */}
            <div className={styles.rightColumnLayout}>
              <Stack spacing={2} className="adminForm">
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-static"
                  label="管理者からのコメント"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={quiz.comment}
                  onChange={changeComment}
                />
                <div className={styles.selectformLayout}>
                  <FormControl className={styles.selectDifficulty}>
                    <InputLabel id="defiiculty-select-label">
                      難易度（１つ選択）
                    </InputLabel>
                    <Select
                      labelId="step-select-label"
                      id="step-select"
                      value={quiz.difficulty}
                      label="difficulty"
                      onChange={changeDifficulty}
                    >
                      <MenuItem value={1}>易しい</MenuItem>
                      <MenuItem value={2}>普通</MenuItem>
                      <MenuItem value={3}>難しい</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControlLabel
                    className={styles.selectIsAccept}
                    control={
                      <Checkbox
                        checked={quiz.is_accept}
                        onChange={changeIsAccepted}
                      />
                    }
                    label="演習問題への掲載を承認する"
                  />
                </div>
              </Stack>
            </div>
          </div>
          {/* 保存ボタン （未実装）*/}
          <Box className="startButton" textAlign="center" py={3}>
            <Button
              onClick={handleSubmit}
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
