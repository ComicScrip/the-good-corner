import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { Length, Min } from "class-validator";
import { ObjectType, Field, Int, InputType, ArgsType } from "type-graphql";
import { Category } from "./category";
import { Tag } from "./tag";
import { ObjectId, PaginationArgs } from "../utils";
import User from "./user";

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ length: 50 })
  @Field()
  title: string;

  @Column({ nullable: true, type: "text" })
  @Field()
  description: string;

  @Field()
  @ManyToOne(() => User, (c) => c.ads, {
    cascade: true,
    onDelete: "CASCADE",
  })
  owner: User;

  @Column({ type: "float" })
  @Field()
  price: number;

  @Column()
  @Field()
  location: string;

  @Column()
  @Field()
  picture: string;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  @ManyToOne(() => Category, (c) => c.ads, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @Field()
  category: Category;

  @JoinTable()
  @ManyToMany(() => Tag, (t) => t.ads, {
    cascade: true,
  })
  @Field(() => [Tag])
  tags: Tag[];
}

@InputType()
export class NewAdInput {
  @Field()
  @Length(5, 50, { message: "Le titre doit contenir entre 5 et 50 caractères" })
  title: string;

  @Field()
  description: string;

  @Field()
  @Min(0, { message: "le prix doit etre positif" })
  price: number;

  @Field()
  location: string;

  @Field()
  picture: string;

  @Field(() => ObjectId)
  category: ObjectId;

  @Field(() => [ObjectId], { nullable: true })
  tags?: ObjectId[];
}
@InputType()
export class UpdateAdInput {
  @Field({ nullable: true })
  @Length(5, 50, { message: "Le titre doit contenir entre 5 et 50 caractères" })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Min(0, { message: "le prix doit etre positif" })
  price?: number;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  picture?: string;

  @Field(() => ObjectId, { nullable: true })
  category?: ObjectId;

  @Field(() => [ObjectId], { nullable: true })
  tags?: ObjectId[];

  @Field({ nullable: true })
  location?: string;
}

@ObjectType()
export class PaginatedAds {
  @Field(() => [Ad])
  list: Ad[];

  @Field(() => Int)
  totalCount: number;
}

@ArgsType()
export class GetAdsArgs extends PaginationArgs {
  @Field({ nullable: true })
  tagIds?: string;

  @Field({ nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  categoryId?: number;

  @Field(() => Int, { nullable: true })
  ownerId?: number;
}
