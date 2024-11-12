import { LoginHeader } from "../components/layout/LoginHeader";
import styles from "./Login.module.css";
import { Logo } from "../components/common/Logo";
import { Button, Stack, TextField } from "@mui/material";

export const Login = () => {
  return (
    <div className={styles.homeScreenTop}>
      <LoginHeader />
      <main className={styles.mainArea}>
        <div className={styles.mainLayout}>
          <div className={styles.loginFrame}>
            <div className={styles.loginLayout}>
              <div className={styles.logo}>
                <Logo />
              </div>
              <div className={styles.loginFormFrame}>
                <h2 className={styles.title}>ログイン</h2>
                <Stack spacing={2}>
                  <TextField label="Email address" variant="outlined" />
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                  />
                </Stack>
                <Stack spacing={2} className={styles.buttonFrame}>
                  <Button variant="contained" className={styles.button}>
                    ログイン
                  </Button>
                  <Button variant="outlined" className={styles.button}>
                    新規登録はこちら
                  </Button>
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
