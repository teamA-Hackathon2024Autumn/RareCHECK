
// import { useEffect, useState } from "react";
import { useState } from "react";

import { Page } from "../components/layout/Page";
import styles from "./AdminEditQuestion.module.css";
// import axios from 'axios';
import {  Checkbox, FormControlLabel, Stack, TextField, Box, Select, Button, FormControl, InputLabel, MenuItem } from "@mui/material";
/* （コメント）mui/icons-materialを使うとエラーが出るので退避、package.jsonにも含めてみたが失敗*/
/* import { CollectionsFilled } from '@mui/icons-material'; */


export const AdminEditQuestion:React.FC = () => {
  
  /*stateの初期値にするquizのデフォルト（axiosで取得できるようになったら不要）*/
  const defaultQuiz = {
    id: '3',
    step: 3,
    category:'その他',
    question: 'ターミナルでディレクトリを作成するlinuxコマンドは？',
    questionImage:'',
    correctAnswer:'mkdir',
    wrongAnswer1:'uname',
    wrongAnswer2:'touch',
    explanation: 'mkdirはディレクトリを作成する時に使うコマンドです。unameは自身の端末のosを確認するコマンドです。touchはファイルを作成するコマンドです',
    explanationImage: '',
    defficulty: '',
    comment: '',
    isAccepted: false,
  };


  /*getリクエストした問題を格納するためのstate（axiosで取得できるようになったら初期値を空のobjにする）*/
  const [quiz, setQuiz] = useState(defaultQuiz);

  /* APIからデータを持ってこれるようになったらこっちを使う*/
  // useEffect(() => {
  //   const getQuiz = async() => {
  //     const res = await axios.get('')
  //     setQuiz(res.data);
  //   }
  //   getQuiz();
  // },[]);
  const defficulties :string[] = ['易しい', '普通', '難しい'];

  const changeDefficulty = (e:any) => {
    const newDefficulty = {...quiz, defficulty: e.target.value};
    setQuiz(newDefficulty);
  };

  const changeComment = (e:any) => {
    const newComment = {...quiz, comment: e.target.value};
    setQuiz(newComment);
  };

  const changeIsAccepted = () => {
    const reverseIsAccepted = !quiz.isAccepted;
    const newIsAccepted = {...quiz, isAccepted: reverseIsAccepted };
    console.log(reverseIsAccepted);
    setQuiz(newIsAccepted);
  };

  const deleteQuestion = () => {

  };

  return(
    <Page login={true}>
      <div className={styles.container}>
        <div>
        <h3>問題を確認・編集する</h3>
        </div>
        <div className="questionStatus">
        <>問題ID: {quiz.id}</>
        <p>難易度:{quiz.defficulty?quiz.defficulty:'未設定'}</p>
        <p>問題掲載: {quiz.isAccepted?'承認':'未承認'}</p>
        </div>
        <form>
          {/* 2カラムにするためのコンテナ */}
          <div className={styles.twoColumnLayout}>
          {/*　左列のレイアウト */}
          <Stack spacing={2} className={styles.leftColumnLayout}>
          <div className={styles.formscolumn}>
            <Stack spacing={2}>
            <div className={styles.selectformLayout}>
                {/*ステップの表示 */}
                <TextField fullWidth
                  value={quiz.step}
                  label="ステップ"
                  variant="filled"
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                ></TextField>
                {/*カテゴリの表示 */}
                <TextField fullWidth
                  value={quiz.category}
                  label="カテゴリ"
                  variant="filled"
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                ></TextField>
            </div>
            <div className="questionAndImage">
              {/* 問題の表示*/}
              <TextField
              sx={{width:'100%'}}
              id="outlined-multiline-static"
              label="問題"
              multiline
              rows={4}
              value={quiz.question}
              variant="filled"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              />
                {/* 問題用画像の表示*/}
                <div>
                  <img src={quiz.questionImage} alt="" /> 
                </div>
            </div>
            {/* 選択肢の表示 */}
            <Stack spacing={2} className="options">
            <TextField 
            label="◯ 正解の選択肢" 
            value={quiz.correctAnswer}
            variant="filled"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
             />
            <TextField 
            label="✕ 不正解の選択肢１" 
            value={quiz.wrongAnswer1}
            variant="filled"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
             />
            <TextField 
            label="✕ 不正解の選択肢２" 
            value={quiz.wrongAnswer2}
            variant="filled"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
             />
            </Stack>
            {/* 解説の表示 */}
            <div className="explanationAndImage">
              <TextField
              sx={{width:'100%'}}
              id="outlined-multiline-static"
              label="解説"
              multiline
              rows={4}
              value={quiz.explanation}
              variant="filled"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              />
              {/* 解説用画像の表示 */}
              <div>
                <img src={quiz.explanationImage} alt="" /> 
              </div>
            </div>
          </Stack>
          </div>
          </Stack>
          {/* 右列のレイアウト */}
          <div className={styles.rightColumnLayout}>
          <Stack spacing={2} className="adminForm">
            <TextField
              sx={{width:'100%'}}
              id="outlined-multiline-static"
              label="管理者からのコメント"
              multiline
              rows={4}
              variant="outlined"
              value={quiz.comment}
              onChange={changeComment}
            />
          <div className={styles.selectformLayout}>
              <FormControl className={styles.selectDefficulty}>
                <InputLabel id="defiiculty-select-label">難易度（１つ選択）</InputLabel>
                <Select
                  labelId="step-select-label"
                  id="step-select"
                  value={quiz.defficulty}
                  label="defficulty"
                  onChange={changeDefficulty}
                  >
                  {defficulties.map((_defficulty) => {  
                    return(
                      <MenuItem key={_defficulty} value={_defficulty}>{_defficulty}</MenuItem>
                    );}
                  )}
                </Select>
              </FormControl>
              <Stack spacing={2} className={styles.checkboxColumn}>
              <FormControlLabel className={styles.selectIsAccept} control={<Checkbox checked={quiz.isAccepted} onChange={changeIsAccepted} />} label="演習問題への掲載を承認する" />
              <FormControlLabel className={styles.selectIsAccept} control={<Checkbox onChange={deleteQuestion} />} label="問題を削除する" />
              </Stack>
            </div>
              </Stack>
            </div>
          </div>
          {/* 保存ボタン （未実装）*/}
          <Box className="startButton" textAlign='center' py={3}>
              <Button variant="contained" size="large" sx={{borderRadius:50, alignItems:'center', backgroundColor:'#2563EB'}}>保存</Button>
          </Box>
        </form>
      </div>
    </Page>
  );
};