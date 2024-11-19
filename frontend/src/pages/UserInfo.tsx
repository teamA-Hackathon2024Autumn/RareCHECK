import { Page } from "../components/layout/Page";
import styles from "./Userinfo.module.css";
import { Button, Stack, TextField } from "@mui/material";

export const UserInfo = () => {
  return (
    <Page login={false}>
      <div className={styles.userInfoFrame}>
        <div className={styles.userInfoLayout}>
          <div className={styles.userInfoFormFrame}>
            <h2 className={styles.title}>ユーザー情報の確認・変更</h2>
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
                保存
              </Button>
              <Button variant="outlined" className={styles.button}>
                戻る
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </Page>
  );
};
