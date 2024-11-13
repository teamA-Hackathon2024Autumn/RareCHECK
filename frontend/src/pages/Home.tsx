import { Page } from "./Page";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <Page>
      <div className={styles.dashboadLayout}>
        <div
          className={styles.dashboardItem}
          style={{
            gridColumn: "1 / 2",
            gridRow: "1 / 3",
            minHeight: "145px",
          }}
        >
          ユーザー名
        </div>
        <div
          className={styles.dashboardItem}
          style={{
            gridColumn: "2 / 2",
            gridRow: "1 / 7",
            minHeight: "485px",
          }}
        >
          ランキング関係
        </div>
        <div
          className={styles.dashboardItem}
          style={{
            gridColumn: "1 / 2",
            gridRow: "3 / 7",
            // minHeight: "180px",
          }}
        >
          お知らせ
        </div>
        <div
          className={styles.dashboardItem}
          style={{
            gridColumn: "2 / 2",
            gridRow: "7 / 13",
            // minHeight: "485px",
          }}
        >
          学習状況
        </div>
        <div
          className={styles.dashboardItem}
          style={{
            gridColumn: "1 / 2",
            gridRow: "7 / 13",
            // minHeight: "580px",
          }}
        >
          問題関係
        </div>
      </div>
    </Page>
  );
};
