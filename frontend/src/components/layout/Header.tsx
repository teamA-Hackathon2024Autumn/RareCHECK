import styles from "./Header.module.css";
import { Logo } from "../common/Logo";
import { Button } from "@mui/material";

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
          <Button variant="contained">マイページ</Button>
          <Button variant="outlined">ログアウト</Button>
        </div>
      </div>
    </header>
  );
};
