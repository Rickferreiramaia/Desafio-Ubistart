import { hashSync, compareSync, genSaltSync } from 'bcryptjs'
import { config } from 'dotenv';

config();
export default class bcrypt {
  generateHash = (
    plainText: string
  ): string => {
    const rounds: number = Number(process.env.BCRYPT_COST);
    const salt: string = genSaltSync(rounds);
    return hashSync(plainText, salt);
  }

  compareHash = (
    plainText: string,
    cypherText: string
  ): boolean => compareSync(plainText, cypherText);
}