import { Resolver, Mutation, Arg, Query, Authorized } from "type-graphql";
import { Like } from "typeorm";
import {
  Category,
  NewCategoryInput,
  UpdateCategoryInput,
} from "../entities/category";
import { notFoundError } from "../utils";

@Resolver(Category)
class CategoriesResolver {
  @Authorized(["admin"])
  @Mutation(() => Category)
  async createCategory(
    @Arg("data", { validate: true }) data: NewCategoryInput
  ) {
    const newCategory = new Category();
    Object.assign(newCategory, data);
    const newCategoryWithId = await newCategory.save();
    return newCategoryWithId;
  }

  @Query(() => [Category])
  async categories(@Arg("name", { nullable: true }) name: string) {
    return await Category.find({
      where: { name: name ? Like(`%${name}%`) : undefined },
      order: { id: "desc" },
    });
  }

  @Authorized(["admin"])
  @Mutation(() => String)
  async deleteCategory(@Arg("categoryId") id: number) {
    const categoryToDelete = await Category.findOneBy({ id });
    if (!categoryToDelete) throw notFoundError();
    await categoryToDelete.remove();
    return "ok";
  }

  @Authorized(["admin"])
  @Mutation(() => Category)
  async updateCategory(
    @Arg("categoryId") id: number,
    @Arg("data", { validate: true }) data: UpdateCategoryInput
  ) {
    const categoryToUpdate = await Category.findOneBy({ id });
    if (!categoryToUpdate) throw notFoundError();
    Object.assign(categoryToUpdate, data);
    return await categoryToUpdate.save();
  }
}

export default CategoriesResolver;
