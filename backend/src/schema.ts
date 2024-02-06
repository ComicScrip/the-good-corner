import { buildSchema } from "type-graphql";
import TagsResolver from "./resolvers/tagsResolver";
import AdsResolver from "./resolvers/adsResolver";
import CategoriesResolver from "./resolvers/categoriesResolver";
import UserResolver from "./resolvers/userResolver";
import { authChecker } from "./auth";

export default buildSchema({
  resolvers: [TagsResolver, AdsResolver, CategoriesResolver, UserResolver],
  authChecker,
});
