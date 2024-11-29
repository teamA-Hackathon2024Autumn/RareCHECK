// import { useEffect, useState } from "react";
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

import { Page } from "../components/layout/Page";
import styles from "./AdminEditQuestion.module.css";
import { PostFeedback } from "../types/api/PostFeedback";
import { GetQuestionDetailAdmin } from "../types/api/GetQuestionDetailAdmin";

export const AdminEditQuestion: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const questionId = location.state?.id;
  console.log(questionId);

  // ログイン状態の確認
  useEffect(() => {
    const storedUserName = localStorage.getItem("rarecheck-username");
    const storedUserIsAdmin = localStorage.getItem("rarecheck-isAdmin");

    if (storedUserIsAdmin === "false") {
      navigate("/admin-home");
    }
    if (storedUserName === null) {
      navigate("/login");
    }
  }, [navigate]);

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

  /*getリクエストした問題を格納するためのstate（axiosで取得できるようになったら初期値を空のobjにする）*/
  const [quiz, setQuiz] = useState<GetQuestionDetailAdmin>(defaultQuiz);

  /*問題を削除するCheckBoxの状態管理 */
  const [isChecked, setIsChecked] = useState(false);

  /*問題の取得 */
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

  // 難易度を数字から文字列に変換
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

  // 編集内容を保存
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
    console.log(feedbackQuiz);
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

    navigate("/adminquestionlist");
  };

  // 問題を削除するのCheckBoxのトリガー
  const handleCheckboxChange = (e: any) => {
    if (e.target.checked) {
      setIsChecked(true);
      // チェックが入ったときに確認ダイアログを表示
      const confirmDelete = window.confirm("本当にこの問題を削除しますか？");
      if (confirmDelete) {
        console.log(isChecked);
        deleteQuestion();
      } else {
        // チェックを外す
        setIsChecked(false);
        console.log(isChecked);
      }
    }
  };
  // 問題の削除
  const deleteQuestion = async () => {
    try {
      // APIにDELETEリクエストを送信
      await axios.delete(
        `http://localhost:5000/rarecheck/admin/question/${questionId}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      // alert("問題が削除されました！");
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("問題の削除に失敗しました。");
    }
    navigate("/adminquestionlist");
  };

  return (
    <Page login={true}>
      <div className={styles.container}>
        <div>
          <h3>問題を確認・編集する</h3>
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
                      onChange={changeStep}
                      fullWidth
                      value={quiz.step}
                      label="ステップ"
                      variant="outlined"
                      slotProps={{
                        input: {
                          readOnly: false,
                        },
                      }}
                    ></TextField>
                    {/*カテゴリの表示 */}
                    <TextField
                      onChange={changeCategory}
                      fullWidth
                      value={quiz.category_name}
                      label="カテゴリ"
                      variant="outlined"
                      slotProps={{
                        input: {
                          readOnly: false,
                        },
                      }}
                    ></TextField>
                  </div>
                  <div className="questionAndImage">
                    {/* 問題の表示*/}
                    <TextField
                      onChange={changeQuestion}
                      sx={{ width: "100%" }}
                      id="outlined-multiline-static"
                      label="問題"
                      multiline
                      rows={4}
                      value={quiz.question}
                      variant="outlined"
                      slotProps={{
                        input: {
                          readOnly: false,
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
                      onChange={changeCorrectAnswer}
                      label="◯ 正解の選択肢"
                      value={quiz.correct_option}
                      variant="outlined"
                      slotProps={{
                        input: {
                          readOnly: false,
                        },
                      }}
                    />
                    <TextField
                      onChange={changeWrongAnswer1}
                      label="✕ 不正解の選択肢１"
                      value={quiz.wrong_option_1}
                      variant="outlined"
                      slotProps={{
                        input: {
                          readOnly: false,
                        },
                      }}
                    />
                    <TextField
                      onChange={changeWrongAnswer2}
                      label="✕ 不正解の選択肢２"
                      value={quiz.wrong_option_2}
                      variant="outlined"
                      slotProps={{
                        input: {
                          readOnly: false,
                        },
                      }}
                    />
                  </Stack>
                  {/* 解説の表示 */}
                  <div className="explanationAndImage">
                    <TextField
                      onChange={changeExplanation}
                      sx={{ width: "100%" }}
                      id="outlined-multiline-static"
                      label="解説"
                      multiline
                      rows={4}
                      value={quiz.explanation}
                      variant="outlined"
                      slotProps={{
                        input: {
                          readOnly: false,
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
                  <Stack spacing={2} className={styles.checkboxColumn}>
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
                    <FormControlLabel
                      className={styles.selectIsAccept}
                      control={
                        <Checkbox
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                          color="warning"
                        />
                      }
                      label="問題を削除する"
                    />
                  </Stack>
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
