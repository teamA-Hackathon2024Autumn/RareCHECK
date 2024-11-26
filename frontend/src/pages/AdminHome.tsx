import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../components/layout/Page";
import { QuestionButton } from "../components/common/QuestionButton";
import styles from "./Home.module.css";

export const AdminHome = () => {
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

  return (
    <Page login={true}>
      <div className={styles.adminHomeFrame}>
        <div className={styles.userNameLayout}>
          <h3 className={styles.userName}>ユーザー名: {userName}</h3>
        </div>
        <div className={styles.noticeLayout}>
          <h2 className={styles.noticeTitle}>お知らせ</h2>
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
            >
              問題一覧
            </QuestionButton>
          </div>
        </div>
      </div>
    </Page>
  );
};
