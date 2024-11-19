import { Page } from "../components/layout/Page";
import { QuestionButton } from "../components/common/QuestionButton";
import styles from "./Home.module.css";

export const AdminHome = () => {
  return (
    <Page login={true}>
      <div className={styles.adminHomeFrame}>
        <div className={styles.userNameLayout}>
          <h3 className={styles.userName}>ユーザー名: RareCHECK@00期</h3>
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
