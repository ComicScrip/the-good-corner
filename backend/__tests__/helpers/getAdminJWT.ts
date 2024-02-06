import jwt from "jsonwebtoken";
import User, { hashPassword } from "../../src/entities/user";
import env from "../../src/env";

export default async function () {
  const admin = await User.create({
    role: "admin",
    avatar: "",
    email: "admin@app.com",
    hashedPassword: await hashPassword("adminadmin"),
    nickname: "admin",
  }).save();
  const JWT = await jwt.sign({ userId: admin.id }, env.JWT_PRIVATE_KEY);
  return { admin, JWT };
}
