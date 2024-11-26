import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../components/layout/Page";
import { QuestionButton } from "../components/common/QuestionButton";
import styles from "./Home.module.css";

export const Home = () => {
  const [userName, setUserName] = useState<string | null>("");
  const navigate = useNavigate();

  useEffect(() => {
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
          className={styles.dashboardItem}
          style={{
            gridColumn: "2 / 2",
            gridRow: "7 / 13",
          }}
        >
          学習状況
        </div>
        <div
          className={`${styles.dashboardItem} ${styles.questionsLayout}`}
          style={{
            gridColumn: "1 / 2",
            gridRow: "7 / 13",
          }}
        >
          <QuestionButton variant="contained" size="large">
            問題演習
          </QuestionButton>
          <QuestionButton variant="contained" size="large">
            問題作成
          </QuestionButton>
          <QuestionButton variant="outlined" size="large">
            問題一覧
          </QuestionButton>
          <QuestionButton variant="outlined" size="large">
            作成した問題一覧
          </QuestionButton>
        </div>
      </div>
    </Page>
  );
};
