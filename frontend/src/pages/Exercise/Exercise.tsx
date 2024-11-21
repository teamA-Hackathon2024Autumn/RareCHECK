import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";

import styles from "./Exercise.module.css";
import { Page } from "../../components/layout/Page";
import { Result } from "./Result";
import {questions} from "./SampleQuestions";

export const Exercise: React.FC = () => {

type Result = {
  question: string,
  selectedOption: string,
  correctAnswer: string,
  id: string,
  isCorrect: boolean,
  category: string
  difficulty: string;
  step?: number;
};

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //問題の配列を順番に取り出すためのステート
  const [selectedOption, setSelectedOption] = useState<string|null>(null); //回答した選択肢を保持するステート
  const [isAnswered, setIsAnswered] = useState(false); //回答済みの問題かどうかを保持するステート
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]); //選択肢の配列の中身をランダムに入れ替えたあとの状態を保持するステート
  const [result, setResult] = useState<Result>(); //１問ごとに回答の結果を格納し、APIで送信するためのステート
  const [allResults, setAllResults] = useState<Result[]>([]);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);

  /*resultに格納するプロパティ
問題id,isCorrrect,datetime
*/

  /*allResultsに格納するオブジェクトの配列
問題id,isCorrect
*/

  useEffect(() => {
    // 選択肢をランダムにシャッフル
    const newOptions = shuffleArray(questions[currentQuestionIndex].options);
    setShuffledOptions(newOptions);
  }, [currentQuestionIndex]);

  const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  //選んだ選択肢がanswerと一致するか（boolean）をisCorrectに格納
  const handleClick = async (option:string) => {
    const isCorrect = option === questions[currentQuestionIndex].answer;
    setSelectedOption(option);
    setIsAnswered(true);

    // 結果を保存
    const newResult = {
      question: questions[currentQuestionIndex].question,
      selectedOption: option,
      correctAnswer: questions[currentQuestionIndex].answer,
      id: questions[currentQuestionIndex].id,
      isCorrect: isCorrect,
      category: questions[currentQuestionIndex].category,
      difficulty: questions[currentQuestionIndex].difficulty,
      step: questions[currentQuestionIndex].step,
    };

    setAllResults((allResults) => [...allResults, newResult]);
    setResult(newResult);

    // 結果をAPIに保存
    const postResult = async () => {
      try {
        await axios.post("http://localhost:5000/submit", { result });
        console.log("post completed!");
      } catch (error) {
        console.error("Error saving result:", error);
      }
    };
    postResult();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  // const isQuizComplete = currentQuestionIndex == questions.length;
  const handleResult = () => {
    allResults.length === questions.length && setIsQuizComplete(true);
  };

  // A, B, Cのラベルを選択肢に関連付け
  const getLabelForOption = (index: number) => {
    return String.fromCharCode(65 + index); // 0 => "A", 1 => "B", 2 => "C"
  };

  return (
    <Page login={true}>
      <div className={styles.container}>
        {!isQuizComplete ? (
          <>
            <h3>
              問題演習（{currentQuestionIndex + 1}/{questions.length}）
            </h3>
            <p className={styles.questionBox}>{questions[currentQuestionIndex].question}</p>
            <img
              src={questions[currentQuestionIndex].explanationimage}
              alt=""
            />
            <div className={styles.buttonGroup}>
              {shuffledOptions.map((option, index) => (
                <div key={option}>
                  <Button
                    variant="contained"
                    color="inherit"
                    size="small"
                    value={option}
                    onClick={() => handleClick(option)}
                    disabled={isAnswered}
                  >
                    {getLabelForOption(index)} {/* A, B, C のラベル */}
                    {/* {String.fromCharCode(65 + index)} A, B, C のラベル */}
                  </Button>
                  <span> {option}</span>
                </div>
              ))}
            </div>

            {isAnswered && (
              <div>
                {/* <div className={styles.corectAndWrongLayout}> */}
                <div className={styles.correctAndWrongLayoutContainer}>
                <p className={styles.corectAndWrongLayout}>
                  <span className={styles.maruBatsuStyle}>
                    {selectedOption === questions[currentQuestionIndex].answer 
                    ? "◯ " 
                    : "✕ "}
                  </span>
                  {selectedOption === questions[currentQuestionIndex].answer
                    ? "正解！"
                    : "不正解！"}
                </p>
                </div>
                <p>正解: {getLabelForOption(shuffledOptions.indexOf(questions[currentQuestionIndex].answer))}</p>
                <p>解説：</p>
                <p>{questions[currentQuestionIndex].explanation}</p>
                <img
                  src={questions[currentQuestionIndex].questionimage}
                  alt=""
                />
                {allResults.length !== questions.length ? (
                <Box className="nextButton " textAlign="center" py={3}>
                  <Button
                    onClick={handleNextQuestion}
                    disabled={!isAnswered}
                    variant="contained"
                    size="large"
                    sx={{
                      borderRadius: 50,
                      alignItems: "center",
                      backgroundColor: "#2563EB",
                    }}
                  >
                    次の問題へ
                  </Button>
                </Box>
                ) : (
                <Box className="nextButton " textAlign="center" py={3}>
                  <Button
                    onClick={handleResult}
                    disabled={!isAnswered}
                    variant="contained"
                    size="large"
                    sx={{
                      borderRadius: 50,
                      alignItems: "center",
                      backgroundColor: "#2563EB",
                    }}
                  >
                    演習結果へ
                  </Button>
                </Box>
                )}
              </div>
            )}
          </>
        ) : (
          <div>
            <div className={styles.resultLayout}>
            <Result allResultsRows={allResults} />
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
                  ホーム画面へ戻る
                </Button>
              </Box>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};
