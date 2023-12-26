import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import User, {
  getSafeAttributes,
  hashPassword,
  UpdateUserInput,
  UserInput,
  verifyPassword,
} from "../entities/user";
import { ContextType } from "../types";
import jwt from "jsonwebtoken";
import env from "../env";

@Resolver(User)
class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    const exisitingUser = await User.findOne({ where: { email: data.email } });
    console.log("user");

    if (exisitingUser !== null) throw new Error("EMAIL_ALREADY_EXISTS");

    const hashedPassword = await hashPassword(data.password);
    return await datasource
      .getRepository(User)
      .save({ ...data, hashedPassword });
  }

  @Mutation(() => String)
  async login(
    @Arg("data") { email, password }: UserInput,
    @Ctx() ctx: ContextType
  ): Promise<string> {
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { email } });

    if (
      user === null ||
      typeof user.hashedPassword !== "string" ||
      !(await verifyPassword(password, user.hashedPassword))
    )
      throw new Error("invalid credentials");

    // https://www.npmjs.com/package/jsonwebtoken
    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);

    // https://stackoverflow.com/a/40135050
    ctx.res.cookie("token", token, {
      secure: env.NODE_ENV === "production",
      httpOnly: true,
    });

    return token;
  }

  @Mutation(() => String)
  async logout(@Ctx() ctx: ContextType): Promise<string> {
    ctx.res.clearCookie("token");
    return "OK";
  }

  @Authorized()
  @Query(() => User)
  async profile(@Ctx() ctx: ContextType): Promise<User> {
    return getSafeAttributes(ctx.currentUser as User);
  }

  @Authorized()
  @Mutation(() => User)
  async updateProfile(
    @Arg("data") data: UpdateUserInput,
    @Ctx() { currentUser }: ContextType
  ): Promise<User> {
    if (typeof currentUser === "undefined") throw new Error("no current user");
    return await datasource
      .getRepository(User)
      .save({ ...currentUser, ...data });
  }
}

export default UserResolver;
