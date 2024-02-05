import jwt from "jsonwebtoken";
import cookie from "cookie";
import { ContextType, JWTPayload } from "./types";
import env from "./env";
import db from "./db";
import User from "./entities/user";
const { JWT_PRIVATE_KEY } = env;

export async function authChecker(
  { context }: { context: ContextType },
  roles: string[] = []
) {
  const { req } = context;
  const tokenInAuthHeaders = req.headers.authorization?.split(" ")[1];
  const tokenInCookie = cookie.parse(req.headers.cookie ?? "").token;
  const token = tokenInAuthHeaders ?? tokenInCookie;
  if (typeof token !== "string") return false;
  const decoded = jwt.verify(token, JWT_PRIVATE_KEY) as JWTPayload;
  if (typeof decoded !== "object") return false;
  const id = decoded.userId;
  const currentUser = await db.getRepository(User).findOneBy({ id });
  if (currentUser === null) return false;
  context.currentUser = currentUser;
  return roles.length === 0 || roles.includes(currentUser.role);
}
