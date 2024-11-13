import { Page } from "../components/layout/Page";
import styles from "./Userinfo.module.css";
import { Logo } from "../components/common/Logo";
import { Button, Stack, TextField } from "@mui/material";

export const SignUp = () => {
  return (
    <Page login={false}>
      <div className={styles.userInfoFrame}>
        <div className={styles.sinupLayout}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.userInfoFormFrame}>
            <h2 className={styles.title}>新規登録</h2>
            <Stack spacing={2}>
              <TextField label="User name" variant="outlined" />
              <TextField label="Email address" variant="outlined" />
              <TextField label="Password" type="password" variant="outlined" />
              <TextField
                label="Re-type password"
                type="password"
                variant="outlined"
              />
            </Stack>
            <Stack spacing={2} className={styles.buttonFrame}>
              <Button variant="contained" className={styles.button}>
                新規登録
              </Button>
              <Button variant="outlined" className={styles.button}>
                ログインはこちら
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </Page>
  );
};
