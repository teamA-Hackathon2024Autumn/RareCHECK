import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Box, Button } from "@mui/material";

import styles from "./Exercise.module.css";
import { Page } from "../../components/layout/Page";
import { Result } from "./Result";
import { PostResult } from "../../types/api/PostResult";
import { GetExercise } from "../../types/api/GetExercise";
import { AllExerciseResult } from "../../types/AllExerciseResult";

export const Exercise: React.FC = () => {
  const navigate = useNavigate();
  const storedUserId = localStorage.getItem("rarecheck-userId");
  const location = useLocation();
  const filter = location.state;
  console.log(filter);   

  const [questions, setQuestions] = useState<GetExercise[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [allResults, setAllResults] = useState<AllExerciseResult[]>([]);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);

  // ログイン状態の確認
  useEffect(() => {
    const storedUserName = localStorage.getItem("rarecheck-username");
    const storedUserIsAdmin = localStorage.getItem("rarecheck-isAdmin");

    if (storedUserIsAdmin === "true") {
      navigate("/admin-home");
    }
    if (storedUserName === null) {
      navigate("/login");
    }

    const fetchQuestions = async () => {
      try {
        const response = await axios.post(
          'http://localhost:5000/rarecheck/questions',
          filter,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );

        console.log('Fetched questions:', response.data);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [filter, navigate]);

  const handleClick = async (option: string) => {
    const isCorrect = option === questions[currentQuestionIndex].correct_option;
    setSelectedOption(option);
    setIsAnswered(true);

    const newAllResult = {
      question: questions[currentQuestionIndex].question,
      selectedOption: option,
      correctAnswer: questions[currentQuestionIndex].correct_option,
      id: questions[currentQuestionIndex].id,
      isCorrect: isCorrect,
      category: questions[currentQuestionIndex].category_name,
      difficulty: questions[currentQuestionIndex].difficulty,
      step: questions[currentQuestionIndex].step,
    };

    const newAllResults = [...allResults, newAllResult];
    setAllResults(newAllResults);

    const newResult = {
      user_id: storedUserId,
      question_id: questions[currentQuestionIndex].id,
      is_solved: isCorrect,
    };

    const postResult = async (result: PostResult) => {
      try {
        await axios.post(
          `http://localhost:5000/rarecheck/questions/${storedUserId}/answer`, 
          result,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        console.log("post completed!");
      } catch (error) {
        console.error("Error saving result:", error);
      }
    };
    postResult(newResult);
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

  const handleResult = () => {
    if (allResults.length === questions.length) {
      setIsQuizComplete(true);
    }
  };

  // A, B, Cのラベルを選択肢に関連付ける関数
  const getLabelForOption = (index: number) => {
    return String.fromCharCode(65 + index); // 0 => "A", 1 => "B", 2 => "C"
  };

  return (
    <Page login={true}>
      <div className={styles.container}>
        {!isQuizComplete ? (
          <>
            <h3>問題演習（{currentQuestionIndex + 1}/{questions.length}）</h3>
            <p className={styles.questionBox}>
              {questions[currentQuestionIndex].question}
            </p>
            <div className={styles.buttonGroup}>
              {questions[currentQuestionIndex].options.map((option, index) => (
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
                  </Button>
                  <span> {option}</span>
                </div>
              ))}
            </div>

            {isAnswered && (
              <div>
                <div className={styles.correctAndWrongLayoutContainer}>
                  <p className={styles.corectAndWrongLayout}>
                    <span className={styles.maruBatsuStyle}>
                      {selectedOption === questions[currentQuestionIndex].correct_option
                        ? "◯ "
                        : "✕ "}
                    </span>
                    {selectedOption === questions[currentQuestionIndex].correct_option
                      ? "正解！"
                      : "不正解！"}
                  </p>
                </div>
                <p>
                  正解: {getLabelForOption(
                    questions[currentQuestionIndex].options.indexOf(
                      questions[currentQuestionIndex].correct_option
                    )
                  )}
                </p>
                <p>解説：</p>
                <p>{questions[currentQuestionIndex].explanation}</p>
                {allResults.length !== questions.length ? (
                  <Box className="nextButton" textAlign="center" py={3}>
                    <Button
                      onClick={handleNextQuestion}
                      disabled={!isAnswered}
                      variant="contained"
                      size="large"
                      sx={{ borderRadius: 50, alignItems: "center", backgroundColor: "#2563EB" }}
                    >
                      次の問題へ
                    </Button>
                  </Box>
                ) : (
                  <Box className="nextButton" textAlign="center" py={3}>
                    <Button
                      onClick={handleResult}
                      disabled={!isAnswered}
                      variant="contained"
                      size="large"
                      sx={{ borderRadius: 50, alignItems: "center", backgroundColor: "#2563EB" }}
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
              <Box className="saveButton" textAlign="center" py={3}>
                <Button
                  onClick={() => navigate("/")}
                  variant="contained"
                  size="large"
                  sx={{ borderRadius: 50, alignItems: "center", backgroundColor: "#2563EB" }}
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
