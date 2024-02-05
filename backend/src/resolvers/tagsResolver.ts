import { Resolver, Mutation, Arg, Query, Authorized } from "type-graphql";
import { GraphQLError } from "graphql";
import { NewTagInput, Tag, UpdateTagInput } from "../entities/tag";
import { Like } from "typeorm";
import { notFoundError } from "../utils";

@Resolver(Tag)
class TagsResolver {
  @Authorized(["admin"])
  @Mutation(() => Tag)
  async createTag(@Arg("data", { validate: true }) data: NewTagInput) {
    const newTag = new Tag();
    Object.assign(newTag, data);
    return await newTag.save();
  }

  @Query(() => [Tag])
  async tags(@Arg("name", { nullable: true }) name: string) {
    return await Tag.find({
      where: { name: name ? Like(`%${name}%`) : undefined },
      order: { id: "desc" },
    });
  }

  @Authorized(["admin"])
  @Mutation(() => String)
  async deleteTag(@Arg("tagId") id: number) {
    const tagToDelete = await Tag.findOneBy({ id });
    if (!tagToDelete) throw notFoundError();
    await tagToDelete.remove();
    return "ok";
  }

  @Authorized(["admin"])
  @Mutation(() => Tag)
  async updateTag(
    @Arg("tagId") id: number,
    @Arg("data", { validate: true }) data: UpdateTagInput
  ) {
    const tagToUpdate = await Tag.findOneBy({ id });
    if (!tagToUpdate) throw notFoundError();
    Object.assign(tagToUpdate, data);
    return await tagToUpdate.save();
  }
}

export default TagsResolver;
