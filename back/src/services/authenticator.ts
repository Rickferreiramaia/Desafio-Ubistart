import { sign, verify } from 'jsonwebtoken'
import { config } from 'dotenv'
import { authenticationData } from '../types';

config();

const { JWT_KEY } = process.env;
export default class authenticator {
  static getTokenData(token: string) {
      throw new Error('Method not implemented.');
  }
  
  generateToken = (
    payload: authenticationData
  ): string => sign(
    payload,
    JWT_KEY!,
    { expiresIn: "1h" }
  )

  getTokenData = (
    token: string
  ):authenticationData | any => {
    return verify(token, JWT_KEY!, (err, decoded) => {
      if (err) {
        return { error: "Invalid token" }
      };
      return decoded;
    });
  }
}