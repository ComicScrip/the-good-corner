import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import User, {
  getSafeAttributes,
  hashPassword,
  UpdateUserInput,
  UserInput,
  UserLoginInput,
  verifyPassword,
} from "../entities/user";
import { ContextType } from "../types";
import jwt from "jsonwebtoken";
import env from "../env";
import { unauthenticatedError } from "../utils";

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
    @Arg("data") { password, email }: UserLoginInput,
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
    if (typeof currentUser === "undefined") throw unauthenticatedError();

    const exisitingUser = await User.findOneBy({ email: data.email || "" });
    console.log({ data, exisitingUser });

    if (exisitingUser !== null && exisitingUser.email !== currentUser.email)
      throw new Error("EMAIL_ALREADY_EXISTS");

    if (data.email) currentUser.email = data.email;
    if (data.password)
      currentUser.hashedPassword = data.password
        ? await hashPassword(data.password)
        : undefined;
    if (data.avatar) currentUser.avatar = data.avatar;
    if (data.nickname) currentUser.nickname = data.nickname;

    return await currentUser.save();
  }
}

export default UserResolver;
