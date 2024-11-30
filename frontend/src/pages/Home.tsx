import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Page } from "../components/layout/Page";
import {
  ExerciseAnalysis,
  ExerciseAnalysisData,
} from "../components/ExerciseAnalysis";
import { fetchExerciseAnalysisData } from "../services/api";
import styles from "./Home.module.css";
import { QuestionButtonArea } from "../components/QuestionButtonArea";
import { Typography } from "@mui/material";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { GetCreatedList } from "../types/api/GetCreatedList";

export const Home = () => {
  const [createdQuiz, setCreatedQuiz] = useState<GetCreatedList[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>("");
  const [exerciseAnalysisData, setExerciseAnalysisData] =
    useState<ExerciseAnalysisData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // ローカルストレージからユーザー名を取得
      const storedUserName = localStorage.getItem("rarecheck-username");
      const storedUserIsAdmin = localStorage.getItem("rarecheck-isAdmin");

      if (storedUserName != "") {
        setUserName(storedUserName);
        if (storedUserIsAdmin === "true") {
          navigate("/admin-home");
          return;
        }
      }
      if (storedUserName === null) {
        navigate("/login");
        return;
      }

      const userId = localStorage.getItem("rarecheck-userId");
      if (userId) {
        const result = await fetchExerciseAnalysisData(userId);

        if (result && "data" in result) {
          if (result.status == 200) {
            setExerciseAnalysisData(result.data);
          }
        } else {
          setExerciseAnalysisData(null);
        }
      }
    };

    fetchData();
  }, [navigate]);

  // 作成済み問題一覧を取得
  useEffect(() => {
    const getQuiz = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/rarecheck/users/questions",
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        );
        setCreatedQuiz(res.data);
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

  const commentCount = createdQuiz.filter((quiz) => quiz.has_comment).length;
  const hasComment = commentCount > 0 ? true : false;

  return (
    <Page login={true}>
      <div className={styles.dashboadLayout}>
        <div
          className={styles.dashboardItem}
          style={{
            gridColumn: "1 / 2",
            gridRow: "1 / 2",
          }}
        >
          <h3 className={styles.userName}>ユーザー名: {userName}</h3>
        </div>
        <div
          className={styles.dashboardItem}
          style={{
            gridColumn: "2 / 2",
            gridRow: "1 / 7",
          }}
        >
          <Typography variant="h6" className={styles.leftAlignedText}>
            ランキング
          </Typography>
          <div className={styles.rankingDetail}>
            <div>
              工事中
              <EngineeringIcon sx={{ fontSize: 40 }} />
            </div>
          </div>
        </div>
        <div
          className={styles.dashboardItem}
          style={{
            gridColumn: "1 / 2",
            gridRow: "2 / 7",
          }}
        >
          <Typography variant="h6" className={styles.leftAlignedText}>
            お知らせ
          </Typography>
          {loading && <div className={styles.userNoticeDetail}>loading...</div>}
          {hasComment ? (
            <div className={styles.userNoticeDetail}>
              作成した問題にコメントがあります！（
              {commentCount}件）
            </div>
          ) : (
            <div className={styles.userNoticeDetail}>お知らせはありません</div>
          )}
        </div>
        <div
          className={`${styles.dashboardItem} ${styles.exerciseAnalysisLayout}`}
          style={{
            gridColumn: "2 / 2",
            gridRow: "7 / 13",
          }}
        >
          <ExerciseAnalysis exerciseAnalysisData={exerciseAnalysisData} />
        </div>
        <div
          className={`${styles.dashboardItem} ${styles.questionsLayout}`}
          style={{
            gridColumn: "1 / 2",
            gridRow: "7 / 13",
          }}
        >
          <QuestionButtonArea />
        </div>
      </div>
    </Page>
  );
};
