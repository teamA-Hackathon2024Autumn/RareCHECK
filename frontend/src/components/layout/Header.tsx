import { useNavigate } from "react-router-dom";
import { Logo } from "../common/Logo";
import { Button } from "@mui/material";
import { logout } from "../../services/auth";
import styles from "./Header.module.css";

export const Header = () => {
  const navigate = useNavigate();

  // ログアウト処理
  const handleLogout = async () => {
    const result = await logout();

    if ("data" in result) {
      if (result.status == 200) {
        // ローカルストレージ、Cookieに含まれるセッションIDを削除
        const storage = localStorage;
        storage.removeItem("rarecheck-userId");
        storage.removeItem("rarecheck-username");
        storage.removeItem("rarecheck-isAdmin");

        navigate("/login");
      }
    } else {
      // エラー時のメッセージを表示
      console.error(result.message);
      alert(result.message);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLayout}>
        <div className={styles.headerLogo} onClick={() => navigate("/")}>
          <Logo />
        </div>
        <div className={styles.headerButtonLayout}>
          <Button
            variant="contained"
            onClick={() => navigate("/userinfo")}
            sx={{
              backgroundColor: "#2563EB",
            }}
          >
            マイページ
          </Button>
          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              borderColor: "#2563EB",
            }}
          >
            ログアウト
          </Button>
        </div>
      </div>
    </header>
  );
};
