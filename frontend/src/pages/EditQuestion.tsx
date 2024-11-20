// import { useEffect, useState } from "react";
import { useState } from "react";

import { Page } from "../components/layout/Page";
import styles from "./EditQuestion.module.css";
// import axios from 'axios';
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
/* （コメント）mui/icons-materialを使うとエラーが出るので退避、package.jsonにも含めてみたが失敗*/
/* import { CollectionsFilled } from '@mui/icons-material'; */

export const EditQuestion: React.FC = () => {
  /*stateの初期値にするquizのデフォルト（axiosで取得できるようになったら不要）*/
  const defaultQuiz = {
    id: "3",
    step: 3,
    category: "その他",
    question: "ターミナルでディレクトリを作成するlinuxコマンドは？",
    questionImage: "",
    correctAnswer: "mkdir",
    wrongAnswer1: "uname",
    wrongAnswer2: "touch",
    explanation:
      "mkdirはディレクトリを作成する時に使うコマンドです。unameは自身の端末のosを確認するコマンドです。touchはファイルを作成するコマンドです",
    explanationImage: "",
    comment: "解説をもう少し具体的にしてください",
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

  /*getリクエストした問題を格納するためのstate（axiosで取得できるようになったら初期値を空のobjにする）*/
  const [quiz, setQuiz] = useState(defaultQuiz);

  // useEffect(() => {
  //   const getQuiz = async() => {
  //     const res = await axios.get('')
  //     setQuiz(res.data);
  //   }
  //   getQuiz();
  // },[]);

  // 冗長なのでuseReduseで作った方がすっきりしそう
  const changeStep = (e: any) => {
    const newStep = { ...quiz, step: e.target.value };
    setQuiz(newStep);
  };

  const changeCategory = (e: any) => {
    const newCategory = { ...quiz, category: e.target.value };
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
    const newCorrectAnswer = { ...quiz, correctAnswer: e.target.value };
    setQuiz(newCorrectAnswer);
  };

  const changeWrongAnswer1 = (e: any) => {
    const newWrongAnswer1 = { ...quiz, wrongAnswer1: e.target.value };
    setQuiz(newWrongAnswer1);
  };

  const changeWrongAnswer2 = (e: any) => {
    const newWrongAnswer2 = { ...quiz, wrongAnswer2: e.target.value };
    setQuiz(newWrongAnswer2);
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
                        ステップ（０または１つ選択）
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
                        value={quiz.category}
                        label="Step"
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
                      defaultValue="Default Value"
                      variant="outlined"
                      value={quiz.question}
                      onChange={changeQuestion}
                    />
                    {/* 問題用画像のアップロード （未実装）*/}
                    <div>
                      <Button variant="contained" size="small" color="inherit">
                        問題用画像を更新{/*<CollectionsFilled/>*/}
                      </Button>
                    </div>
                  </div>
                  {/* 選択肢編集 */}
                  <Stack spacing={2} className="options">
                    <TextField
                      label="◯ 正解の選択肢"
                      value={quiz.correctAnswer}
                      onChange={changeCorrectAnswer}
                    />
                    <TextField
                      label="✕ 不正解の選択肢１"
                      value={quiz.wrongAnswer1}
                      onChange={changeWrongAnswer1}
                    />
                    <TextField
                      label="✕ 不正解の選択肢２"
                      value={quiz.wrongAnswer2}
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
                      defaultValue="Default Value"
                      variant="outlined"
                      value={quiz.explanation}
                      onChange={changeExplanation}
                    />
                    {/* 解説用画像のアップロード（未実装） */}
                    <div>
                      <Button variant="contained" size="small" color="inherit">
                        解説用画像を更新{/*<CollectionsFilled/>*/}
                      </Button>
                    </div>
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
