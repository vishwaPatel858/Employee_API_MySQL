import { pool } from "../utility/mysql_database.ts";
import { redisClient } from "../utility/redis.utility.ts";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JwtPayload ,VerifyErrors} from "jsonwebtoken";
export const queryAsync = <T>(query: string): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    pool.query(query, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

export const sqlQueryAsync = <T>(query: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    pool.query(query, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

export const generateEncryptedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  let encryptedPass = await bcrypt.hash(password, salt);
  return encryptedPass;
};

export const validatePassword = async (
  password: string,
  encryptedPass: string
) => {
  const validatePass = await bcrypt.compare(password, encryptedPass);
  return validatePass;
};

export const generateAccessToken = async (id: string) => {
  const secretKey = process.env.JWT_Access_SECRET || "";
  const accessToken = await jwt.sign({ id: id }, secretKey, {
    expiresIn: 3600,
  });
  await redisClient.set(accessToken, id);
  return accessToken;
};

export const generateRefreshToken = async (id: string) => {
  const secretKey = process.env.JWT_Refresh_SECRET || "";
  const refreshToken = await jwt.sign({ id: id }, secretKey, {
    expiresIn: 86400,
  });
  await redisClient.set(refreshToken, id);
  await redisClient.set(id, refreshToken);
  return refreshToken;
};

