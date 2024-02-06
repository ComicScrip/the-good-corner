import { DataSource } from "typeorm";
import { Ad } from "./entities/ad";
import { Tag } from "./entities/tag";
import { Category } from "./entities/category";
import User from "./entities/user";
import env from "./env";
const { DB_USER, DB_PASS, DB_NAME, DB_PORT, DB_HOST } = env;

export default new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities: [Ad, Tag, Category, User],
  synchronize: true,
  // logging: true,
});
