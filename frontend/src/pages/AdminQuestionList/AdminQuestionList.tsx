import React from "react";

import { Page } from "../../components/layout/Page";
import { FormAndTable } from "./FormAndTable";
import { questionRows } from "./SampleQuestions";

// type QuestionAwaitingCheck = {
//   question: string;
//   id: string;
//   category: string;
//   step?: number;
//   username: string;
// };

export const AdminQuestionList: React.FC = () => {
  // SampleQuestions.tsxから問題をimportしているが、
  // 本番はuseEffectでAPIからデータを取得する！

  return (
    <>
      <Page login={true}>
        <FormAndTable rows={questionRows} />
      </Page>
    </>
  );
};
