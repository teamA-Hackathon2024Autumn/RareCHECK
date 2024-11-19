import { Page } from "../components/layout/Page";
import styles from "./Userinfo.module.css";
import { Logo } from "../components/common/Logo";
import { Button, Stack, TextField } from "@mui/material";

export const Login = () => {
  return (
    <Page login={false}>
      <div className={styles.userInfoFrame}>
        <div className={styles.userInfoLayout}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.userInfoFormFrame}>
            <h2 className={styles.title}>ログイン</h2>
            <Stack spacing={2}>
              <TextField label="Email address" variant="outlined" />
              <TextField label="Password" type="password" variant="outlined" />
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
    </Page>
  );
};
