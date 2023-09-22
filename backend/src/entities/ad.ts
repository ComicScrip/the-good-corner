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

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @Length(5, 50, { message: "Le titre doit contenir entre 5 et 50 caractères" })
  title: string;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column()
  owner: string;

  @Column({ type: "float" })
  @Min(0, { message: "le prix doit etre positif" })
  price: number;

  @Column()
  location: string;

  @Column()
  picture: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(() => Category, (c) => c.ads, {
    cascade: true,
    onDelete: "CASCADE",
  })
  category: Category;

  @JoinTable()
  @ManyToMany(() => Tag, (t) => t.ads, {
    cascade: true,
  })
  tags: Tag[];
}
