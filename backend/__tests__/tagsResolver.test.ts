import { execute } from "../jest.setup";
import { Tag } from "../src/entities/tag";
import getTagsQuery from "./operations/getTags";

describe("Tags Resolver", () => {
  it("can send a list of tags", async () => {
    await Tag.create({ name: "tag1" }).save();
    await Tag.create({ name: "tag2" }).save();
    const res = await execute(getTagsQuery);
    expect(res).toMatchInlineSnapshot(`
{
  "data": {
    "tags": [
      {
        "id": 2,
        "name": "tag2",
      },
      {
        "id": 1,
        "name": "tag1",
      },
    ],
  },
}
`);
  });
});
