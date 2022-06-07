import { Request, Response } from 'express'
import _todoLogic from '../logic/todoLogic';
import { iInputTodo, iTodoDTO, todoType } from "../types";
import { authenticationData } from '../types';
import _authenticator from '../services/authenticator';


const todoLogic = new _todoLogic();

export default class todoController {
  static createTodo(arg0: string, createTodo: any) {
      throw new Error("Method not implemented.");
  }
  createTodo = async (req: Request, res: Response) => {
    // const token = req.headers.authorization as string
    // const {description,deadline}=req.body
    try {
       
      const user: authenticationData = res.locals.authenticationData;
      const Todo = {
          
        description: req.body.description,
        deadline: req.body.deadline,
      };

     await todoLogic.createTodo(Todo, user)
    // const post=await todoLogic.createTodo(description,deadline)

      res.status(201).send({  success: "ToDo created successfully!" });
    } catch (error: any) {
      const { statusCode, message } = error
      res.status(statusCode || 400).send({ error: message });
    }
  };

  getTodoByUser = async (req: Request, res: Response) => {
    try {
      const user: authenticationData = res.locals.authenticationData;
      const result = await todoLogic.getTodoByUser(user)

      res.status(200).send({ success: result, user });
    } catch (error: any) {
      const { statusCode, message } = error
      res.status(statusCode || 400).send({ error: message });
    }
  };

  getTodoByAdmin = async (req: Request, res: Response) => {
    try {
      const user: authenticationData = res.locals.authenticationData;
      const result = await todoLogic.getTodoByAdmin(user)

      res.status(200).send({ success: result, user });
    } catch (error: any) {
      const { statusCode, message } = error
      res.status(statusCode || 400).send({ error: message });
    }
  };

  updateTodo = async (req: Request, res: Response) => {
    try {
      const user: authenticationData = res.locals.authenticationData;
      const todo: todoType = {
        id: req.body.id,
        description: req.body.description,
        status: req.body.status,
        deadline: req.body.deadline,
      }

      await todoLogic.updateTodo(todo)

      res.status(200).send({ success: "ToDo updated successfully", user });
    } catch (error: any) {
      const { statusCode, message } = error
      res.status(statusCode || 400).send({ error: message });
    }
  };
}