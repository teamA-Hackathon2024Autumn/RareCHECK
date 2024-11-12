import Button from "@mui/material/Button";
import styles from "./Header.module.css";
import { Logo } from "../common/Logo";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLayout}>
        <div
          className={styles.headerLogo}
          onClick={() => alert("クリックされました")}
        >
          <Logo />
        </div>
        <div className={styles.headerButtonLayout}>
          <Button variant="contained">ユーザー設定</Button>
          <Button variant="outlined">ログアウト</Button>
        </div>
      </div>
    </header>
  );
};
