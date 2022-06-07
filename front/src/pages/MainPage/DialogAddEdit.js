import React, { useState, useEffect } from "react";
import moment from "moment";
import { createTodo, updateTodo } from "../../services/todo";
import useForm from "../../hooks/useForm";
import validateRequestErrors from "../../errors/validateRequestErrors";
//material
import {
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormGroup,
  FormControlLabel,
  Switch,
  CircularProgress,
} from "@mui/material/";

const deadlineIsBeforeToday = (deadline) => {
  return moment(deadline, "YYYY-MM-DD").isBefore(moment().format("YYYY-MM-DD"));
};

const DialogAddEdit = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, onChange, clear] = useForm({
    id: "",
    description: "",
    deadline: "",
    status: "PENDIND",
  });

  const onSwitch = (event) => {
    event.target.checked ? (form.status = "DONE") : (form.status = "PENDIND");
  };

  const handleClose = () => {
    clear();
    props.handleCloseDialog();
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if (deadlineIsBeforeToday(form.deadline) && form.status !== "DONE") {
      return alert("The deadline must be greater than the current date.");
    }

    if (props.editForm) {
      const ret = await updateTodo(form, setIsLoading);

      if (ret.error) return validateRequestErrors(ret);

      clear();
      alert(ret.success);
    } else {
      const ret = await createTodo(form, setIsLoading);

      if (ret.error) return validateRequestErrors(ret);

      clear();
      alert(ret.success);
    }

    props.getTodos();
    handleClose();
  };

  useEffect(() => {
    form.id = props.selectedTodo.id;
    form.description = props.selectedTodo.description;
    form.deadline = props.selectedTodo.deadline;
    form.status = props.selectedTodo.status;
  }, [props.selectedTodo]);

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle> {props.editForm ? "Edit ToDo" : "New ToDo"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter description and deadline.
        </DialogContentText>
        <form onSubmit={onSubmitForm}>
          <TextField
            autoFocus
            id="description"
            label="Description"
            name="description"
            variant="outlined"
            margin="normal"
            fullWidth={true}
            value={form.description}
            defaultValue={props.selectedTodo.description}
            onChange={onChange}
            required
          />
          <TextField
            id="deadline"
            name="deadline"
            variant="outlined"
            margin="dense"
            fullWidth={true}
            value={form.deadline}
            defaultValue={props.selectedTodo.deadline}
            onChange={onChange}
            required
            type="date"
          />
          {props.editForm && (
            <FormGroup style={{ alignItems: "center" }}>
              <FormControlLabel
                control={
                  <Switch
                    onChange={onSwitch}
                    defaultChecked={form.status === "DONE" ? true : false}
                  />
                }
                label="Done"
              />
            </FormGroup>
          )}
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ minWidth: 110, minHeight: 41 }}
            >
              {isLoading ? (
                <CircularProgress color={"inherit"} size={24} />
              ) : props.editForm ? (
                "Save"
              ) : (
                "Create"
              )}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddEdit;
