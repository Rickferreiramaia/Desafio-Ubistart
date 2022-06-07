import { Request, Response } from "express";
import _userLogic from "../logic/userLogic";
import { iUserSignUpDTO } from "../types";

const userLogic = new _userLogic();

export default class userController {
  signUp = async (req: Request, res: Response) => {
      
    try {
      const inputUserDTO: iUserSignUpDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin
      };

      const token = await userLogic.createUser(inputUserDTO);

      res.status(201).send({ success: { token } });
    } catch (error: any) {
      const { statusCode, message } = error
      res.status(statusCode || 400).send({ error: message });
    }
  };

  signIn = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const token: string = await userLogic.signIn(email, password);
      res.status(200).send({ success: { token } });
    } catch (error: any) {
      const { statusCode, message } = error
      res.status(statusCode || 400).send({ error: message });
    }
  };
}
