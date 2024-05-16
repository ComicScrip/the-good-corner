import { argon2id, hash, verify } from "argon2";
import { IsEmail, IsUrl, Matches, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./ad";
import { SesionService } from "../services/SessionService";
import kvStore from "../kvStore";

export type Role = "visitor" | "admin";

@Entity()
@ObjectType()
class User extends BaseEntity {
  @BeforeUpdate()
  async preSave() {
    const sessionStore = await new SesionService(await kvStore);
    await sessionStore.setUser(this);
  }

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  hashedPassword?: string;

  @Field()
  @Column({ enum: ["visitor", "admin"], default: "visitor" })
  role: Role;

  @Field()
  @Column({
    default:
      "https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png",
  })
  avatar: string;

  @Field()
  @Column()
  nickname: string;

  @ManyToOne(() => Ad, (ad) => ad.owner)
  ads: Ad[];
}

@InputType()
export class UserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
  password: string;

  @Field()
  @MinLength(3)
  nickname: string;
}

@InputType()
export class UserLoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
  password?: string;

  @Field()
  @MinLength(3)
  @Field({ nullable: true })
  nickname?: string;

  @Field({ nullable: true })
  @MinLength(3)
  @IsUrl()
  avatar?: string;
}

// https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
const hashingOptions = {
  memoryCost: 2 ** 16,
  timeCost: 5,
  type: argon2id,
};

export const hashPassword = async (plainPassword: string): Promise<string> =>
  await hash(plainPassword, hashingOptions);

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> =>
  await verify(hashedPassword, plainPassword, hashingOptions);

export const getSafeAttributes = (user: User): User =>
  ({
    ...user,
    hashedPassword: undefined,
  } as User);

export default User;
