import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
} from "typeorm";
import { Ad } from "./ad";
import { Length } from "class-validator";
import { ObjectType, Field, Int, InputType } from "type-graphql";

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Length(2, 50)
  @Field()
  name: string;

  @ManyToMany(() => Ad, (ad) => ad.tags)
  ads: Ad[];
}

@InputType()
export class NewTagInput {
  @Field()
  name: string;
}
