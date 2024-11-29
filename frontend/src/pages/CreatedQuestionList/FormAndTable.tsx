import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

import { GetCreatedList } from "../../types/api/GetCreatedList";
// ソートのための比較関数
function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  if (a[orderBy] === "" && b[orderBy] !== "") {
    return 1; // 空文字の方を後ろに
  }
  if (b[orderBy] === "" && a[orderBy] !== "") {
    return -1; // 空文字の方を後ろに
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

// ソート処理の設定
function getComparator<Key extends keyof CreatedQuestionData>(
  order: Order,
  orderBy: Key,
): (a: CreatedQuestionData, b: CreatedQuestionData) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof CreatedQuestionData;
  label: string;
  numeric: boolean;
}

// 問題のオブジェクトの型定義
type CreatedQuestionData = {
  id: number | string;
  question: string;
  step: number | string;
  category_name: string;
  created_at: string;
  has_comment: boolean;
  is_accept: boolean;
  btn?: string;
};

// propsの型定義
type CreatedQuestionProps = {
  rows: GetCreatedList[];
};

const headCells: readonly HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "問題ID" },
  { id: "question", numeric: false, disablePadding: false, label: "問題本文" },
  { id: "step", numeric: true, disablePadding: false, label: "ステップ" },
  {
    id: "category_name",
    numeric: false,
    disablePadding: false,
    label: "カテゴリ",
  },
  {
    id: "created_at",
    numeric: false,
    disablePadding: false,
    label: "作成年月日",
  },
  {
    id: "has_comment",
    numeric: false,
    disablePadding: false,
    label: "コメント",
  },
  {
    id: "is_accept",
    numeric: false,
    disablePadding: false,
    label: "承認状況",
  },
  { id: "btn", numeric: false, disablePadding: false, label: "" },
];

interface EnhancedTableProps {
  order: Order;
  orderBy: string;
  rowCount: number;
  onRequestSort: (property: keyof CreatedQuestionData) => void;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property: keyof CreatedQuestionData) => () => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ paddingLeft: 2, whiteSpace: "nowrap" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// 検索フォームと表の関数コンポーネント
export const FormAndTable: React.FC<CreatedQuestionProps> = ({ rows }) => {
  const navigate = useNavigate();

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof CreatedQuestionData>("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState("");

  //dateを変換
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月は0始まりなので +1 する
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}/${month}/${day}`;
  }

  const handleRequestSort = (property: keyof CreatedQuestionData) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // フィルタリングされた行
  const visibleRows = React.useMemo(() => {
    return [...rows]
      .filter(
        (row) =>
          row.id.toString().includes(searchQuery.toLowerCase()) ||
          row.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.step.toString().includes(searchQuery.toLowerCase()) ||
          row.category_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.created_at.toString().includes(searchQuery.toLowerCase()) ||
          row.has_comment.toString().includes(searchQuery.toLowerCase()) ||
          row.is_accept.toString().includes(searchQuery.toLowerCase()),
      )
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [order, orderBy, page, rowsPerPage, searchQuery]);

  const handleButtonClick = (row: CreatedQuestionData) => {
    navigate("/editquestion", { state: { id: row.id } });
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: 2,
        width: "100%",
      }}
    >
      <Box sx={{ marginBottom: 2 }}>
        <h2>作成した問題一覧</h2>
        <TextField
          label="検索"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell sx={{ border: "1px solid #ddd" }}>
                    {row.id}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>
                    {row.question}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>
                    {row.step}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>
                    {row.category_name}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>
                    {formatDate(row.created_at)}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>
                    {row.has_comment ? "あり" : "なし"}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>
                    {row.is_accept ? "承認済み" : "未承認"}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>
                    <Button
                      color="inherit"
                      variant="contained"
                      onClick={() => handleButtonClick(row)}
                    >
                      確認
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, page) => handleChangePage(page)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
