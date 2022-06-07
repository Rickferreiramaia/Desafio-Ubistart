import {connection} from "../data/connection";
import { CustomError } from "../error/error";
import { TodoList, Users } from "../types";
import { iTodoDTO, todoType } from "../types";

export default class todoData {
  createTodo = async (
    iTodoDTO: iTodoDTO
  ): Promise<any> => {
    try {
      return await connection(TodoList).insert(iTodoDTO);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error)
    }
  }

  getTodoByUser = async (id: string) => {
    try {
      return await
        connection("TodoList")
          .where({ id_user: id })
          .orderBy('deadline', 'asc');
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error)
    }
  }

  getTodoByAdmin = async () => {
    try {
      const data = await connection.raw(`
      select 
      tdl.*,
      usr.email 
      from ${TodoList} tdl
      inner join ${Users} usr on (tdl.id_user = usr.id)
      order by tdl.deadline asc
      `)

      return data[0];
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error)
    }
  }

  updateTodo = async (todo: todoType) => {
    try {
      return await connection("TodoList").update(todo).where({ id: todo.id });
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error)
    }
  }
}