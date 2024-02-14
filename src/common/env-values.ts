import * as dotenv from "dotenv";

dotenv.config();

export const envs = {
  APP_PORT: +process.env.APP_PORT || 4006,
  DATABASE_PORT: +process.env.DATABASE_PORT || 1433,
  DATABASE_HOST: process.env.DATABASE_HOST || "localhost",
  DATABASE_USER: process.env.DATABASE_USER || "postgres",
  DATABASE_PASSWORD: `${process.env.DATABASE_PASSWORD || "postgres"}`,
  DATABASE_NAME: process.env.DATABASE_NAME || "balandrau2",
  JWT_SECRET: process.env.JWT_SECRET || "default",
};
