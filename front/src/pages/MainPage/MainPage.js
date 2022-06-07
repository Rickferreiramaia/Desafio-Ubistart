import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import useProtectedPage from "../../hooks/useProtectedPage";
import { getTodosByUser, getTodosByUserAdmin } from "../../services/todo";
import validateRequestErrors from "../../errors/validateRequestErrors";
//components
import DataGrid from "./DataGrid";
import DialogAddEdit from "./DialogAddEdit";
import Filters from "./Filters";
import { goToSignIn } from "../../routes/coordinator";
//styled
import { DivScreen, DivButton, DivButtonsAdmin, DivIsLoading } from "./styled";
//material
import { Button, Card, CardContent, LinearProgress } from "@mui/material/";

const MainPage = () => {
  
  const history = useHistory();
  const [todos, setTodos] = useState([]);
  const [todosFiltered, setTodosFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});
  const [editForm, setEditForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [showEmailColumn, setShowEmailColumn] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = async () => {
    setSelectedTodo({});
    setEditForm(false);
    setOpen(false);
  };

  const getTodos = async () => {
    const ret = await getTodosByUser(setIsLoading);

    // if (ret.error) return validateRequestErrors(ret, history);

    // setShowEmailColumn(false);
    // setTodos(ret.success);
    // setIsAdmin(ret.user.admin);
  };

  const getTodosAdmin = async () => {
    const ret = await getTodosByUserAdmin(setIsLoading);

    if (ret.error) return validateRequestErrors(ret, history);

    setShowEmailColumn(true);
    setTodos(ret.success);
    setIsAdmin(ret.user.admin);
  };

  const onRowClickGrid = (todo) => {
    if (todo.status === "DONE")
      return alert("A completed TODO cannot be updated :(");

    setSelectedTodo(todo);
    setEditForm(true);
    handleClickOpen();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <DivScreen>
     
      <Card
        sx={{
          width: "90vw",
          height: "85vh",
          marginTop: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ width: "90%" }}>
          <Filters todos={todos} setTodosFiltered={setTodosFiltered} />
          <DataGrid
            todos={todosFiltered}
            onRowClick={onRowClickGrid}
            showEmailColumn={showEmailColumn}
          />
          <DivIsLoading>
            {isLoading && <LinearProgress sx={{ height: 5, width: "90%" }} />}
          </DivIsLoading>
          <DivButton>
            <Button onClick={handleClickOpen} variant={"contained"}>
              NEW TODO
            </Button>
            {isAdmin && (
              <DivButtonsAdmin>
                <Button variant="contained" onClick={getTodos}>
                  MY TODOS
                </Button>
                <Button variant="contained" onClick={getTodosAdmin}>
                  ALL TODOS
                </Button>
              </DivButtonsAdmin>
            )}
          </DivButton>
        </CardContent>
      </Card>
      <DialogAddEdit
        editForm={editForm}
        handleCloseDialog={handleCloseDialog}
        getTodos={getTodos}
        selectedTodo={selectedTodo}
        open={open}
      />
    </DivScreen>
  );
};

export default MainPage;
