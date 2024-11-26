import { useNavigate } from "react-router-dom";
import { Logo } from "../common/Logo";
import styles from "./Header.module.css";

export const LoginHeader = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.headerLayout}>
        <div className={styles.headerLogo} onClick={() => navigate("/")}>
          <Logo />
        </div>
      </div>
    </header>
  );
};
