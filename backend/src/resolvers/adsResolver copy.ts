import { Resolver, Query, Arg } from "type-graphql";
import { Ad } from "../entities/ad";
import { GraphQLError } from "graphql";

@Resolver(Ad)
class AdsResolver {
  @Query(() => [Ad])
  async ads() {
    return Ad.find({ relations: { category: true, tags: true } });
  }

  @Query(() => Ad)
  async getAdById(@Arg("adId") id: string) {
    const ad = await Ad.findOne({
      where: { id: parseInt(id, 10) },
      relations: { category: true, tags: true },
    });
    if (!ad) throw new GraphQLError("not found");
    return ad;
  }
}

export default AdsResolver;
