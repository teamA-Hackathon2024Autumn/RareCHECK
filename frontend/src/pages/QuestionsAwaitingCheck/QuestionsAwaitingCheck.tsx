import React from "react";

import { Page } from "../../components/layout/Page";
import { FormAndTable } from "./FormAndTable";
import styles from "./QuestionsAwaitingCheck.module.css";
import { questionRows } from "./SampleQuestions";

// type QuestionAwaitingCheck = {
//   question: string;
//   id: string;
//   category: string;
//   step?: number;
//   username: string;
// };

export const QuestionsAwaitingCheck: React.FC = () => {
  // SampleQuestions.tsxから問題をimportしているが、
  // 本番はuseEffectでAPIからデータを取得する！

  return (
    <>
      <Page login={true}>
        <p className={styles.numberOfQuestion}>
          確認待ちの問題{questionRows.length}件
        </p>
        <FormAndTable rows={questionRows} />
      </Page>
    </>
  );
};
