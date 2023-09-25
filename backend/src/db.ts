import { DataSource } from "typeorm";
import Ad from "./entities/ad";
import Tag from "./entities/tag";
import Category from "./entities/category";

export default new DataSource({
  type: "sqlite",
  database: "the_good_corner.sqlite",
  entities: [Ad, Tag, Category],
  synchronize: true,
  logging: true,
});
