import _PostData from "../data/userData";
import _bcrypt from "../services/hashManager";
import _authenticator from "../services/authenticator";
import idGenerator from "../services/idGenerator";
import { iUserSignUpDTO, userType } from "../types";
import { CustomError } from "../error/error";

const postData = new _PostData();
const bcrypt = new _bcrypt();
const authenticator = new _authenticator();

export default class UserLogic {
  createUser = async (inputUserDTO: iUserSignUpDTO): Promise<string> => {
    try {
      if (!inputUserDTO.name || !inputUserDTO.email || !inputUserDTO.password) {
        throw new CustomError(422, '"name", "email", "password" and "admin" must be provided');
      }

      const id = idGenerator();
      const cypherPassword = await bcrypt.generateHash(inputUserDTO.password);

      const newUser: userType = {
        id,
        name: inputUserDTO.name,
        email: inputUserDTO.email,
        password: cypherPassword,
        admin: inputUserDTO.admin
      };

      await postData.createUser(newUser);

      return authenticator.generateToken({ id, admin: newUser.admin });
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  signIn = async (
    email: string,
    password: string
  ): Promise<string> => {
    try {
      if (!email || !password) {
        throw new CustomError(422, "Email and password must be provided.");
      }

      const user: userType = await postData.getUserByEmail(email);
      
      if (!user) {
        throw new CustomError(401, "errooor Invalid username or password.");
      }


      const token: string = authenticator.generateToken({ id: user.id, admin: user.admin });

      return token;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
