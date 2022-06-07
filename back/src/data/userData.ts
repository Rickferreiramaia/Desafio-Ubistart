import {connection} from "../data/connection";
import { CustomError } from "../error/error";
import { Users } from "../types";
import { userType } from "../types";

export default class UserData {
  createUser = async (newUser: userType): Promise<void> => {
    try {
      return await connection("Users").insert(newUser);
    } catch (error: any) {
      if (String(error).includes("Duplicate entry")) {
        throw new CustomError(409, 'This email already exists')
      }

      throw new CustomError(error.statusCode, error.sqlMessage || error);
    }
  };

  getUserByEmail = async (email: string): Promise<userType> => {
    try {
      const result = await connection("Users").where({ email });

      return result[0];
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error);
    }
  };
}
