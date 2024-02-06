import db from "../src/db";
import User from "../src/entities/user";
import jwt from "jsonwebtoken";

import env from "../src/env";

export async function getJWTFor(user: Partial<User>) {
  await db.getRepository(User).save(user);
  return jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);
}
