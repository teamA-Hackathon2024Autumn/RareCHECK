import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@mui/material";

import styles from "./Exercise.module.css";
import { Page } from "./Page";


export const Exercise: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]); 

  interface Question {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
    questionimage: string;
    explanationimage: string;
  }  

  const questions: Question[] = [
    {
      question: '日本の首都はどこですか？',
      options: ['東京', '大阪', '京都'],
      answer: '東京',
      explanation: '東京は日本の首都であり、政治、経済、文化の中心です。',
      questionimage: 'https://example.com/image1.jpg',
      explanationimage: '',
    },
    {
      question: '地球の衛星は何ですか？',
      options: ['月', '火星', '金星'],
      answer: '月',
      explanation: '地球の唯一の自然の衛星は月です。',
      questionimage: '',
      explanationimage: '',
    },
    {
      question: '最も大きな陸上動物は何ですか？',
      options: ['キリン', 'ゾウ', '馬'],
      answer: 'ゾウ',
      explanation: 'ゾウは最も重く、最も大きな陸上動物です。',
      questionimage: 'https://example.com/image2.jpg',
      explanationimage: '',
    },
  ];

  useEffect(() => {
    // 選択肢をランダムにシャッフル
    const newOptions = shuffleArray(questions[currentQuestionIndex].options);
    setShuffledOptions(newOptions);
  }, [currentQuestionIndex]);

  const shuffleArray = (array: string[]) => {
    console.log(array.sort(() => Math.random() - 0.5));
    return array.sort(() => Math.random() - 0.5);
  };

  const handleClick = async (option: string) => {
    const isCorrect = option === questions[currentQuestionIndex].answer;
    setSelectedOption(option);
    setIsAnswered(true);

    // 結果を保存
    const newResult = {
      question: questions[currentQuestionIndex].question,
      selectedOption: option,
      correctAnswer: questions[currentQuestionIndex].answer,
      isCorrect: isCorrect,
    };
     

    // 結果をAPIに保存
    try {
      await axios.post('http://localhost:5000/submit', { newResult });
      setResults((prevResults) => [...prevResults, newResult]);
    } catch (error) {
      console.error('Error saving result:', error);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };
  const isQuizComplete = currentQuestionIndex >= questions.length;


  return (
    <Page>
      <div className={styles.container}>
        {!isQuizComplete ? (
          <>
            <h1>問題演習（{currentQuestionIndex +1 }/{questions.length}）</h1>
            <h2>{questions[currentQuestionIndex].question}</h2>
            <img src={questions[currentQuestionIndex].explanationimage} alt="" />
            <div className={styles.buttonGroup}>
              {shuffledOptions.map((option, index) => (
                <div>
                  <Button
                    variant="contained"
                    color="inherit" 
                    size="small"
                    key={option}
                    onClick={() => handleClick(option)}
                    disabled={isAnswered}
                  >
                    {String.fromCharCode(65 + index)} {/* A, B, C のラベル */}
                  </Button><span> {option}</span>
                </div>
              ))}
            </div>
            
            {isAnswered && (
              <div>
                <h3>{selectedOption === questions[currentQuestionIndex].answer ? '正解！' : '不正解！'}</h3>
                <p>{questions[currentQuestionIndex].explanation}</p>
                <img src={questions[currentQuestionIndex].questionimage} alt="" />           
                <button
                  onClick={handleNextQuestion}
                  style={{ marginTop: '20px', padding: '10px' }}
                  disabled={!isAnswered}
                >
                  次の問題へ
                </button>
              </div>
            )}
          </>
        ) : (
          <div>
            <h2>すべての問題が終了しました！</h2>
            <h3>結果</h3>
            <p>総回答数: {results.length}</p>
            <p>正解数: {results.filter(result => result.isCorrect).length}</p>
            <h3>解いた問題の結果一覧:</h3>
            <ul>
              {results.map((result, index) => (
                <li key={index}>
                  <strong>問題:</strong> {result.question}<br />
                  <strong>選択肢:</strong> {result.selectedOption}<br />
                  <strong>正答:</strong> {result.correctAnswer}<br />
                  <strong>結果:</strong> {result.isCorrect ? '正解' : '不正解'}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Page>
  );
};
