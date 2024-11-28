import { Button, styled } from "@mui/material";

export const QuestionButton = styled(Button)(() => ({
  "font-size": "20px",
  "border-radius": "80px",
  "backgroundColor": "#2563EB",
}));

export const QuestionOutlinedButton = styled(Button)(() => ({
  "font-size": "20px",
  "border-radius": "80px",
  "borderColor": "#2563EB", // アウトラインカラー (outlined の場合)
}));
