// import { useState } from "react";

// import { Page } from "./Page";
// import styles from "./CreateQuestion.module.css";
// import {  TextField, Box, Select, Button, FormControl, FormControlLabel, InputLabel, MenuItem } from "@mui/material";

// export const CreateQuestion:React.FC = () => {
  
//   /*stetの初期値にするquizのデフォルト*/
//   const defaultQuiz = {
//     step: '',
//     category:'',
//     question: '',
//     questionImage:'',
//     correctAnswer:'',
//     wrongAnswer1:'',
//     wrongAnswer2:'',
//     explanation: '',
//     explanationImage: '',
//   };
//   /*1~500までの配列*/
//   const steps = Array.from({ length: 500 }, (v, i) => (i + 1).toString());
//   console.log(steps);

//   const categories = ["インフラ", "プログラミング", "ウェブシステム", "セキュリティ","アーキテクティング", "AI/データサイエンス", "UI/UX", "ビジネススキル", "その他"];

//   const [quiz, setQuiz] = useState(defaultQuiz);

//   const selectStep = (e:any) => {
//     const newStep = {...quiz, step: e.target.value};
//     setQuiz(newStep);
//   };

//   const selectCategory = (e:any) => {
//     const newCategory = {...quiz, category: e.target.value};
//     setQuiz(newCategory);
//   }

//   return(
//     <Page>
//       <div className={styles.container}>
//         <h3>問題を新規作成</h3>
//         <form>
//           <div className={styles.formscolumn}>
//             {/*ステップ選択：０または１つ選択 */}
//             <div className={styles.selectform}>
//               <FormControl fullWidth>
//                 <InputLabel id="step-select-label">ステップ（０または１つ選択）</InputLabel>
//                 <Select
//                   labelId="step-select-label"
//                   id="step-select"
//                   value={quiz.step}
//                   label="Step"
//                   defaultValue=''
//                   onChange={selectStep}
//                 >
//                   {steps.map((step) => {  
//                     return(
//                       <MenuItem key={step} value={step}>{step}</MenuItem>
//                     );}
//                   )}
//                 </Select>
//               </FormControl>
//             {/*カテゴリ：１つ選択 */}
//               <FormControl fullWidth>
//                   <InputLabel id="step-select-label">カテゴリ（１つ選択）</InputLabel>
//                   <Select
//                     labelId="category-select-label"
//                     id="category-select"
//                     value={quiz.category}
//                     label="Step"
//                     defaultValue=''
//                     onChange={selectCategory}
//                   >
//                     {categories.map((category) => {  
//                       return(
//                         <MenuItem key={category} value={category}>{category}</MenuItem>
//                       );}
//                     )}
//                   </Select>
//               </FormControl>
//             </div>
//             {/* 問題*/}
//             <TextField
//             id="outlined-multiline-static"
//             label="問題"
//             multiline
//             rows={4}
//             defaultValue="Default Value"
//             variant="outlined"
//             />
//             {/* 問題用画像のアップロード */}
//             {/* 選択肢 */}
//             {/* 解説 */}
//             {/* 解説用画像のアップロード */}
//             {/* 送信ボタン */}
//             <Box className="startButton "textAlign='center' py={3}>
//                 <Button variant="contained" size="large" sx={{borderRadius:50, alignItems:'center', backgroundColor:'#2563EB'}}>START</Button>
//             </Box>
//             </div>
//           </form>
//       </div>
//     </Page>
//   );
// };