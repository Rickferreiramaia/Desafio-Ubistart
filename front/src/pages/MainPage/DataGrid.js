import React, { useEffect } from "react";
import moment from "moment";
//material
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

let columns = [
  { id: "description", label: "Description", minWidth: 300 },
  {
    id: "deadline",
    label: "Deadline",
    minWidth: 100,
    align: "center",
    format: "date",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 70,
    align: "center",
  },
  {
    id: "createdAt",
    label: "Created",
    minWidth: 100,
    align: "center",
    format: "datetime",
  },
  {
    id: "updatedAt",
    label: "Updated",
    minWidth: 100,
    align: "center",
    format: "datetime",
  },
  {
    id: "finishedAt",
    label: "Finished",
    minWidth: 100,
    align: "center",
    format: "datetime",
  },
];

const formatDate = (date, type = "date") => {
  if (!moment(date).isValid()) return "";

  if (type === "datetime") {
    return moment(date).format("DD/MM/YYYY HH:mm:ss");
  } else {
    return moment(date).format("DD/MM/YYYY");
  }
};

const deadlineIsBeforeToday = (deadline) => {
  return moment(deadline, "YYYY-MM-DD HH:mm:ss").isBefore(
    moment().format("YYYY-MM-DD")
  );
};

function createData(
  id,
  description,
  deadline,
  status,
  createdAt,
  updatedAt,
  finishedAt,
  email
) {
  return {
    id,
    description,
    deadline,
    status,
    createdAt,
    updatedAt,
    finishedAt,
    email,
  };
}

const colorToDoLate = (todo) => {
  if (todo.status !== "DONE" && deadlineIsBeforeToday(todo.deadline)) {
    return "#FFCEC3";
  } else {
    return "#FFF";
  }
};

export default function StickyHeadTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rows = props.todos.map((todo) => {
    return createData(
      todo.id,
      todo.description,
      todo.deadline,
      todo.status,
      todo.createdAt,
      todo.updatedAt,
      todo.finishedAt,
      todo.email
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (props.showEmailColumn) {
      columns.push({
        id: "email",
        label: "Email",
        minWidth: 100,
        align: "center",
      });
    } else {
      columns = columns.filter((column) => column.id !== "email");
    }
  }, [props.showEmailColumn]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", border: 1 }}>
      <TableContainer sx={{ height: 500 }}>
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    onClick={() => props.onRowClick(row)}
                    style={{ backgroundColor: colorToDoLate(row) }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format
                            ? formatDate(value, column.format)
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
