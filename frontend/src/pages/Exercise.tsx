import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";

import styles from "./Exercise.module.css";
import { Page } from "../components/layout/Page";

export const Exercise: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //問題の配列を順番に取り出すためのステート
  const [selectedOption, setSelectedOption] = useState<string | null>(null); //回答した選択肢を保持するステート
  const [isAnswered, setIsAnswered] = useState(false); //回答済みの問題かどうかを保持するステート
  const [shuffledOptions, setShuffledOptions] = useState<any[]>([]); //選択肢の配列の中身をランダムに入れ替えたあとの状態を保持するステート
  const [result, setResult] = useState({}); //１問ごとに回答の結果を格納し、APIで送信するためのステート
  const [allResults, setAllResults] = useState<
    {
      question: string;
      selectedOption: string;
      correctAnswer: string;
      id: string;
      isCorrect: boolean;
    }[]
  >([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  /*resultに格納するプロパティ
問題id,isCorrrect,datetime
*/

  /*allResultsに格納するオブジェクトの配列
問題id,isCorrect
*/

  interface Question {
    id: string;
    question: string;
    options: string[];
    answer: string;
    explanation: string;
    questionimage: string;
    explanationimage: string;
  }

  const questions: Question[] = [
    {
      id: "1",
      question: "日本の首都はどこですか？",
      options: ["東京", "大阪", "京都"],
      answer: "東京",
      explanation: "東京は日本の首都であり、政治、経済、文化の中心です。",
      questionimage: "https://example.com/image1.jpg",
      explanationimage: "",
    },
    {
      id: "2",
      question: "地球の衛星は何ですか？",
      options: ["月", "火星", "金星"],
      answer: "月",
      explanation: "地球の唯一の自然の衛星は月です。",
      questionimage: "",
      explanationimage: "",
    },
    {
      id: "3",
      question: "最も大きな陸上動物は何ですか？",
      options: ["キリン", "ゾウ", "馬"],
      answer: "ゾウ",
      explanation: "ゾウは最も重く、最も大きな陸上動物です。",
      questionimage: "https://example.com/image2.jpg",
      explanationimage: "",
    },
  ];

  useEffect(() => {
    // 選択肢をランダムにシャッフル
    const newOptions = shuffleArray(questions[currentQuestionIndex].options);
    setShuffledOptions(newOptions);
  }, [currentQuestionIndex]);

  const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  //選んだ選択肢がanswerと一致するか（boolean）をisCorrectに格納
  const handleClick = async (option: string) => {
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

  return (
    <Page login={true}>
      <div className={styles.container}>
        {!isQuizComplete ? (
          <>
            <h1>
              問題演習（{currentQuestionIndex + 1}/{questions.length}）
            </h1>
            <h2>{questions[currentQuestionIndex].question}</h2>
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
                    onClick={() => handleClick(option)}
                    disabled={isAnswered}
                  >
                    {String.fromCharCode(65 + index)} {/* A, B, C のラベル */}
                  </Button>
                  <span> {option}</span>
                </div>
              ))}
            </div>

            {isAnswered && (
              <div>
                <h3>
                  {selectedOption === questions[currentQuestionIndex].answer
                    ? "正解！"
                    : "不正解！"}
                </h3>
                <p>{questions[currentQuestionIndex].explanation}</p>
                <img
                  src={questions[currentQuestionIndex].questionimage}
                  alt=""
                />
                {allResults.length !== questions.length ? (
                  <button
                    onClick={handleNextQuestion}
                    style={{ marginTop: "20px", padding: "10px" }}
                    disabled={!isAnswered}
                  >
                    次の問題へ
                  </button>
                ) : (
                  <button
                    onClick={handleResult}
                    style={{ marginTop: "20px", padding: "10px" }}
                    disabled={!isAnswered}
                  >
                    演習結果へ
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div>
            <h2>すべての問題が終了しました！</h2>
            <h3>結果</h3>
            <p>総回答数: {allResults.length}</p>
            <p>
              正解数: {allResults.filter((result) => result.isCorrect).length}
            </p>
            <h3>解いた問題の結果一覧:</h3>
            <ul>
              {allResults.map((result) => (
                <li key={result.id}>
                  <strong>問題:</strong> {result.question}
                  <br />
                  <strong>選択肢:</strong> {result.selectedOption}
                  <br />
                  <strong>正答:</strong> {result.correctAnswer}
                  <br />
                  <strong>結果:</strong> {result.isCorrect ? "◯" : "✕"}
                </li>
              ))}
            </ul>
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
          </div>
        )}
      </div>
    </Page>
  );
};
