import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
} from "typeorm";
import { Ad } from "./ad";
import { Length } from "class-validator";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 50)
  name: string;

  @ManyToMany(() => Ad, (ad) => ad.tags)
  ads: Ad[];
}
