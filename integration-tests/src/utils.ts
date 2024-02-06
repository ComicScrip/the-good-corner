import db from "../../backend/src/db";
import User from "../../backend/src/entities/user";
import jwt from "jsonwebtoken";

import env from "../../backend/src/env";

export async function getJWTFor(user: Partial<User>) {
  await db.getRepository(User).save(user);
  return jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);
}
