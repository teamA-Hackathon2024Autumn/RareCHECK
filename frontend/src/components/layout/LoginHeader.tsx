import styles from "./Header.module.css";
import { Logo } from "../common/Logo";

export const LoginHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLayout}>
        <div
          className={styles.headerLogo}
          onClick={() => alert("クリックされました")}
        >
          <Logo />
        </div>
      </div>
    </header>
  );
};
