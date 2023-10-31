import { Resolver, Mutation, Arg } from "type-graphql";
import { GraphQLError } from "graphql";
import { NewTagInput, Tag } from "../entities/tag";
import { validate } from "class-validator";

@Resolver(Tag)
class TagsResolver {
  @Mutation(() => Tag)
  async createTag(@Arg("data") { name }: NewTagInput) {
    const newTag = Tag.create({ name });
    const errors = await validate(newTag);
    if (errors.length !== 0)
      throw new GraphQLError("invalid data", { extensions: { errors } });
    const newTagWithId = await newTag.save();
    return newTagWithId;
  }
}

export default TagsResolver;
