import { Button, styled } from "@mui/material";

export const QuestionButton = styled(Button)(() => ({
  "font-size": "20px",
  "border-radius": "80px",
  "backgroundColor": "#2563EB",
  "&:hover": {
    backgroundColor: "#2563EB", // ホバー時の背景色
    color: "#FFFFFF", // ホバー時のテキスト色
  },
}));

export const QuestionOutlinedButton = styled(Button)(() => ({
  "font-size": "20px",
  "border-radius": "80px",
  "borderColor": "#2563EB", // アウトラインカラー (outlined の場合)
  "&:hover": {
    backgroundColor: "#2563EB", // ホバー時の背景色
    color: "#FFFFFF", // ホバー時のテキスト色
  },
}));
