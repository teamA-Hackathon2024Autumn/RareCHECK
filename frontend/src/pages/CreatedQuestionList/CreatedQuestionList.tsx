import React from "react";

import { Page } from "../../components/layout/Page";
import { FormAndTable } from "./FormAndTable";
import styles from "./CreatedQuestionList.module.css";
import { createdQuestionRows } from "./SampleQuestions";

export const CreatedQuestionList: React.FC = () => {
  // SampleQuestions.tsxから問題をimportしているが、
  // 本番はuseEffectでAPIからデータを取得する！

  return (
    <>
      <Page login={true}>
        <p className={styles.numberOfQuestion}>
          確認待ちの問題{createdQuestionRows.length}件
        </p>
        <FormAndTable rows={createdQuestionRows} />
      </Page>
    </>
  );
};
