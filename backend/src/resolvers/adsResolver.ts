import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Int,
  Authorized,
  Ctx,
} from "type-graphql";
import { Ad, NewAdInput, UpdateAdInput } from "../entities/ad";
import { GraphQLError } from "graphql";
import { validate } from "class-validator";
import { ILike, In } from "typeorm";
import { ContextType } from "../types";
import {
  invalidDataError,
  notFoundError,
  unauthaurizedError,
  unauthenticatedError,
} from "../utils";

@Resolver(Ad)
class AdsResolver {
  @Query(() => [Ad])
  async ads(
    @Arg("tagsId", { nullable: true }) tagIds?: string,
    @Arg("categoryId", () => Int, { nullable: true }) categoryId?: number,
    @Arg("title", { nullable: true }) title?: string
  ) {
    console.log({ title });

    return Ad.find({
      relations: { category: true, tags: true },
      where: {
        tags: {
          id:
            typeof tagIds === "string" && tagIds.length > 0
              ? In(tagIds.split(",").map((t) => parseInt(t, 10)))
              : undefined,
        },
        title: title ? ILike(`%${title}%`) : undefined,
        category: {
          id: categoryId,
        },
      },
    });
  }

  @Query(() => Ad)
  async getAdById(@Arg("adId", () => Int) id: number) {
    const ad = await Ad.findOne({
      where: { id },
      relations: { category: true, tags: true, owner: true },
    });
    if (!ad) throw notFoundError();
    return ad;
  }

  @Authorized()
  @Mutation(() => Ad)
  async createAd(
    @Arg("data", { validate: true }) data: NewAdInput,
    @Ctx() { currentUser }: ContextType
  ) {
    if (typeof currentUser === "undefined") throw unauthenticatedError();
    const newAd = new Ad();
    Object.assign(newAd, data);
    newAd.owner = { id: currentUser?.id } as any;
    const { id } = await newAd.save();
    return Ad.findOne({
      where: { id },
      relations: { category: true, tags: true },
    });
  }

  @Authorized()
  @Mutation(() => Ad)
  async updateAd(
    @Arg("adId") id: number,
    @Arg("data", { validate: true }) data: UpdateAdInput,
    @Ctx() { currentUser }: ContextType
  ) {
    if (typeof currentUser === "undefined") throw unauthenticatedError();
    const adToUpdate = await Ad.findOne({
      where: { id },
      relations: { owner: true },
    });
    if (!adToUpdate) throw notFoundError();
    if (currentUser.role !== "admin" && currentUser.id !== adToUpdate.owner.id)
      throw unauthaurizedError();
    await Object.assign(adToUpdate, data);
    await adToUpdate.save();
    return Ad.findOne({
      where: { id },
      relations: { category: true, tags: true },
    });
  }

  @Authorized()
  @Mutation(() => String)
  async deleteAd(@Arg("adId") id: number, @Ctx() { currentUser }: ContextType) {
    if (typeof currentUser === "undefined") throw unauthenticatedError();
    const ad = await Ad.findOne({ where: { id }, relations: { owner: true } });
    if (!ad) throw notFoundError();
    if (currentUser.role !== "admin" && currentUser.id !== ad.owner.id)
      throw unauthaurizedError();
    await ad.remove();
    return "deleted";
  }
}

export default AdsResolver;
