import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Page } from "../components/layout/Page";
import { QuestionButton } from "../components/common/QuestionButton";
import styles from "./Home.module.css";

export const AdminHome = () => {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>("");
  const navigate = useNavigate();

  useEffect(() => {
    // ローカルストレージからユーザー名を取得
    const storedUserName = localStorage.getItem("rarecheck-username");
    const storedUserIsAdmin = localStorage.getItem("rarecheck-isAdmin");

    if (storedUserName != "") {
      setUserName(storedUserName);
      if (storedUserIsAdmin != "true") {
        navigate("/");
      }
    } else if (storedUserName === null) {
      navigate("/login");
    }
  }, [navigate]);

  // 確認待ち問題一覧を取得
  useEffect(() => {
    const getQuiz = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/rarecheck/admin/notaccept/questions",
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        );
        setQuiz(res.data);
        setLoading(false); // データ取得後にローディングを終了
      } catch (error) {
        console.error("Error fetching data:", error);
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data);
        }
        setLoading(false); // エラーが発生してもローディングを終了
      }
    };
    getQuiz();
  }, []);

  return (
    <Page login={true}>
      <div className={styles.adminHomeFrame}>
        <div className={styles.userNameLayout}>
          <h3 className={styles.userName}>ユーザー名: {userName}</h3>
        </div>
        <div className={styles.noticeLayout}>
          <h3 className={styles.noticeTitle}>お知らせ</h3>
          {loading ? (
            <div className={styles.noticeDetail}>loaading...</div>
          ) : (
            <div className={styles.noticeDetail}>
              確認待ちの問題{quiz.length}件
            </div>
          )}
        </div>
        <div className={styles.buttonLayout}>
          <div className={styles.buttonArea}>
            <QuestionButton
              variant="contained"
              size="large"
              sx={{
                flex: 1,
                height: "100%",
              }}
              onClick={() => navigate("/QuestionsAwaitingCheck")}
            >
              確認待ち問題一覧
            </QuestionButton>
            <QuestionButton
              variant="contained"
              size="large"
              sx={{
                flex: 1,
                height: "100%",
              }}
              onClick={() => navigate("/AdminQuestionList")}
            >
              問題一覧
            </QuestionButton>
          </div>
        </div>
      </div>
    </Page>
  );
};
