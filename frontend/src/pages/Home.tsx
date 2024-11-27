import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../components/layout/Page";
import {
  ExerciseAnalysis,
  ExerciseAnalysisData,
} from "../components/ExerciseAnalysis";
import { fetchExerciseAnalysisData } from "../services/api";
import styles from "./Home.module.css";
import { QuestionButtonArea } from "../components/QuestionButtonArea";

export const Home = () => {
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
        }
      }
      if (storedUserName === null) {
        navigate("/login");
      }

      const userId = localStorage.getItem("rarecheck-userId");
      if (userId) {
        const result = await fetchExerciseAnalysisData(userId);
        console.log(result);
        setExerciseAnalysisData(result);

        // 実際のリクエストの処理
        // if ("data" in result) {
        //   console.log("OK");
        //   // if (result.status == 200) {
        //   //   console.log("OK");
        //   // }
        // } else {
        //   console.log("Error");
        //   // エラー時のメッセージを表示
        //   // console.error(result.message);
        //   // setErrorMessage(result.message);
        // }
      }
    };

    fetchData();
  }, [navigate]);

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
          ランキング関係
        </div>
        <div
          className={styles.dashboardItem}
          style={{
            gridColumn: "1 / 2",
            gridRow: "2 / 7",
          }}
        >
          お知らせ
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
