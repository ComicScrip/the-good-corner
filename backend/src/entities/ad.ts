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
import { Category } from "./category";
import { Tag } from "./tag";
import { ObjectType, Field, Int } from "type-graphql";

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ length: 50 })
  @Length(5, 50, { message: "Le titre doit contenir entre 5 et 50 caractères" })
  @Field()
  title: string;

  @Column({ nullable: true, type: "text" })
  @Field()
  description: string;

  @Column()
  @Field()
  owner: string;

  @Column({ type: "float" })
  @Min(0, { message: "le prix doit etre positif" })
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
