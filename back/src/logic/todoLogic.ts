import _todoData from "../data/todoData";
import _authenticator from "../services/authenticator";
import _bcrypt from "../services/hashManager";
import { iInputTodo, iTodoDTO, todoType } from "../types";
import generateId from "../services/idGenerator";
import moment from "moment";
import { CustomError } from "../error/error";
import { authenticationData } from "../types";

const todoData = new _todoData();
const deadlineIsBeforeToday = (deadline: Date) => {
  return moment(deadline, "YYYY-MM-DD").isBefore(moment().format("YYYY-MM-DD"));
}

export default class todoLogic {
  createTodo = async (inputTodo: iInputTodo, user: authenticationData): Promise<void> => {
    try {
      if (!inputTodo.description || !inputTodo.deadline) {
        throw new CustomError(422, '"description" and "deadline" must be provided');
      }
      if (deadlineIsBeforeToday(inputTodo.deadline)) {
        throw new CustomError(422, "The deadline must be greater than the current date.");
      }

      const id = generateId();

      const newTodo: iTodoDTO = {
        id,
        description: inputTodo.description,
        status: "PENDIND",
        deadline: inputTodo.deadline,
        id_user: user.id
      };

      return todoData.createTodo(newTodo);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  getTodoByUser = async (user: authenticationData) => {
    try {
      return await todoData.getTodoByUser(user.id);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  getTodoByAdmin = async (user: authenticationData) => {
    try {
      if (!user.admin) throw new CustomError(401, "To get all ToDos, the user must be an administrator.");

      return await todoData.getTodoByAdmin();
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  updateTodo = async (todo: todoType) => {
    try {
      if (deadlineIsBeforeToday(todo.deadline) && todo.status !== "DONE") {
        throw new CustomError(422, "The deadline must be greater than the current date.");
      }

      return await todoData.updateTodo(todo);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}