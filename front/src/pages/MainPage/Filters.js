import React, { useState, useEffect } from "react";
import moment from "moment";
//styled
import { DivFilters } from "./styled";
//material
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material/";

const Filters = (props) => {
  const [filters, setFilters] = useState({
    status: "PENDIND",
    description: "",
    onlyOverdueTodos: false,
  });

  //TODO: Separate responsibility from filters
  const executeFilter = (filters) => {
    let result = [...props.todos];

    for (let [key, value] of Object.entries(filters)) {
      if (key === "status") {
        switch (value) {
          case "DONE":
            result = result.filter((todo) => todo.status === value);
            break;
          case "PENDIND":
            result = result.filter((todo) => todo.status === value);
            break;
          case "ALL":
            break;
          default:
            throw new Error("Error reading status.");
        }
      }
      if (key === "description") {
        const search = value.toLowerCase();
        result = result.filter((todo) =>
          todo.description.toLowerCase().includes(search)
        );
      }
      if (key === "onlyOverdueTodos") {
        if (value) {
          result = result.filter((todo) => {
            return (
              todo.status === "PENDIND" &&
              moment(todo.deadline, "YYYY-MM-DD").isBefore(
                moment().format("YYYY-MM-DD")
              )
            );
          });
        }
      }

      props.setTodosFiltered(result);
    }
  };

  const onChangeSelectStatus = (event) => {
    setFilters({ ...filters, status: event.target.value });
  };

  const onChangeDescriptionFilter = (event) => {
    setFilters({ ...filters, description: event.target.value });
  };

  const onChangeSelectOverdueTodos = (event) => {
    setFilters({ ...filters, onlyOverdueTodos: event.target.value });
  };

  useEffect(() => {
    executeFilter(filters);
  }, [props.todos, filters]);

  return (
    <DivFilters>
      <FormControl style={{ width: "200px" }}>
        <InputLabel id="status">Status</InputLabel>
        <Select
          id="status"
          label="Status"
          labelId="status"
          value={filters.status}
          onChange={onChangeSelectStatus}
        >
          <MenuItem value={"ALL"}>ALL</MenuItem>
          <MenuItem value={"DONE"}>DONE</MenuItem>
          <MenuItem value={"PENDIND"}>PENDIND</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="outlined-basic"
        label="Description"
        variant="outlined"
        sx={{ width: "600px" }}
        onChange={onChangeDescriptionFilter}
      />
      <FormControl style={{ width: "200px" }}>
        <InputLabel id="overdueTodos">Only overdue todos</InputLabel>
        <Select
          id="overdueTodos"
          label="overdueTodos"
          labelId="overdueTodos"
          value={filters.onlyOverdueTodos}
          onChange={onChangeSelectOverdueTodos}
        >
          <MenuItem value={true}>YES</MenuItem>
          <MenuItem value={false}>NO</MenuItem>
        </Select>
      </FormControl>
    </DivFilters>
  );
};

export default Filters;
