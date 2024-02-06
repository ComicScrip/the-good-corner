import { buildSchema } from "type-graphql";
import { authChecker } from "./auth";
import r from "./resolvers/index";

export default () => buildSchema({ resolvers: r as any, authChecker });
