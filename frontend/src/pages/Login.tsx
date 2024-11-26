import { useState } from "react";
import { Page } from "../components/layout/Page";
import { Logo } from "../components/common/Logo";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import styles from "./Userinfo.module.css";

export type LoginFormValues = {
  email: string; // メールアドレス
  password: string; // パスワード
};

export const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  // ログイン失敗時のエラーメッセージ状態
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const result = await login(data);

    if ("data" in result) {
      if (result.status == 200) {
        const userId: string = result.data.userId;
        const userName: string = result.data.username;
        const isAdmin: boolean = result.data.isAdmin;

        // ローカルストレージにユーザー名とユーザーID, 管理者かどうかを保存
        // 理想はセッションIDのみ保存してリクエスト毎にユーザー情報を取得したい
        const storage = localStorage;
        storage.setItem("rarecheck-userId", userId);
        storage.setItem("rarecheck-username", userName);
        storage.setItem("rarecheck-isAdmin", isAdmin.toString());

        // 管理者かどうかでホーム画面を切り替え
        if (isAdmin) {
          navigate("/admin-home");
        } else {
          navigate("/");
        }
      }
    } else {
      // エラー時のメッセージを表示
      console.error(result.message);
      setErrorMessage(result.message);
    }
  };

  return (
    <Page login={false}>
      <div className={styles.userInfoFrame}>
        <div className={styles.userInfoLayout}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.userInfoFormFrame}>
            <h2 className={styles.title}>ログイン</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <TextField
                  label="Email address"
                  variant="outlined"
                  {...register("email", {
                    required: "メールアドレスを入力してください。",
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  {...register("password", {
                    required: "パスワードを入力してください。",
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Stack>
              {errorMessage && (
                <Typography
                  variant="body2"
                  color="error"
                  className={styles.errorMessage}
                >
                  {errorMessage}
                </Typography>
              )}
              <Stack spacing={2} className={styles.buttonFrame}>
                <Button
                  type="submit"
                  variant="contained"
                  className={styles.button}
                >
                  ログイン
                </Button>
                <Button
                  variant="outlined"
                  className={styles.button}
                  onClick={() => navigate("/signup")}
                >
                  新規登録はこちら
                </Button>
              </Stack>
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
};
