import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import styles from "./Result.module.css";

type Column = {
  id: "id" | "question" | "step" | "category" | "difficulty" | "isCorrect";
  label: string;
  minWidth?: number;
  align?: "left" | "center";
};

const columns: readonly Column[] = [
  { id: "id", label: "問題ID", minWidth: 60 },
  { id: "question", label: "問題", minWidth: 200, align: "left" },
  {
    id: "step",
    label: "ステップ",
    align: "center",
    minWidth: 30,
  },
  {
    id: "category",
    label: "カテゴリ",
    align: "center",
    minWidth: 60,
  },
  {
    id: "difficulty",
    label: "難易度",
    align: "center",
    minWidth: 40,
  },
  {
    id: "isCorrect",
    label: "正誤",
    align: "center",
    minWidth: 30,
  },
];

type Result = {
  question: string;
  selectedOption: string;
  correctAnswer: string;
  id: number;
  isCorrect: boolean;
  category: string;
  step: number | string;
  difficulty: string;
};

type ResultSummaryProps = {
  allResultsRows: Result[];
};

export const Result: React.FC<ResultSummaryProps> = ({ allResultsRows }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <h2>演習結果</h2>
      <div className={styles.resultSummaryBox}>
        <span>演習数: {allResultsRows.length}</span>
        <span>
          正答数: {allResultsRows.filter((result) => result.isCorrect).length}
        </span>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {allResultsRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id as keyof Result];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{ border: "1px solid #ddd" }}
                          >
                            {column.id === "isCorrect"
                              ? value
                                ? "◯"
                                : "✕" // 正誤の表示を修正
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={allResultsRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, page) => handleChangePage(page)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};
