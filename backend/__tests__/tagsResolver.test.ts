import { gql } from "@apollo/client/core";
// import Ad from "../../backend/src/entities/ad";
// import db from "../../backend/src/db";
import { execute } from "../jest.setup";
import { Tag } from "../../backend/src/entities/tag";

/*
const createWilderMutation = gql`
  mutation CreateWilder($data: WilderInput!) {
    createWilder(data: $data) {
      id
      name
    }
  }
`;
*/

const readTagsQuery = gql`
  query Tags {
    tags {
      id
      name
    }
  }
`;

/*
const deleteWilderMutation = gql`
  mutation DeleteWilder($deleteWilderId: Int!) {
    deleteWilder(id: $deleteWilderId)
  }
`;
*/

describe("Ads resolver", () => {
  describe("create wilder", () => {
    it("should create wilder given valid attributes", async () => {
      /*
      const res = await client.mutate({
        mutation: createWilderMutation,
        variables: { data: { name: "Dave" } },
      });

      expect(res.data?.createWilder).toHaveProperty("id");
      expect(res.data?.createWilder).toHaveProperty("name", "Dave");
      */
    });

    it("should not create wilder given invalid attributes and return an error", async () => {
      /*
      await expect(() =>
        client.mutate({
          mutation: createWilderMutation,
          variables: { data: { name: "" } },
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Argument Validation Error"`
      );
      */
    });
  });

  describe.only("read ads", () => {
    it("should return an array", async () => {
      const t = Tag.create([{ name: "testing" }, { name: "testing2" }]);
      await Promise.all(t.map((tag) => tag.save()));
      const res = await execute({ query: readTagsQuery });
      const { tags } = res.body.singleResult.data;
      expect(tags.length).toBe(2);
      expect(tags[0]).toHaveProperty("id");
      expect(tags[1]).toHaveProperty("id");
      expect(tags[0]).toHaveProperty("name");
      expect(tags[1]).toHaveProperty("name");
    });
  });

  describe("delete wilder", () => {
    it("should return an error message when not logged in", async () => {
      /*
      const wilder = await db.getRepository(Wilder).save({ name: "jojo" });

      await expect(() =>
        client.mutate({
          mutation: deleteWilderMutation,
          fetchPolicy: "no-cache",
          variables: { deleteWilderId: wilder.id },
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Access denied! You don't have permission for this action!"`
      );

      expect(await db.getRepository(Wilder).count()).toBe(1);
      */
    });

    it("should return an error message when logged in but not as admin", async () => {
      /*
      const wilder = await db.getRepository(Wilder).save({ name: "jojo" });
      const token = await getJWTFor({
        email: "notadmin@site.com",
        role: "visitor",
      });

      await expect(() =>
        client.mutate({
          mutation: deleteWilderMutation,
          fetchPolicy: "no-cache",
          variables: { deleteWilderId: wilder.id },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Access denied! You don't have permission for this action!"`
      );

      expect(await db.getRepository(Wilder).count()).toBe(1);
      /*
    });

    it("should return true when logged in as admin", async () => {
      /*
      const wilder = await db.getRepository(Wilder).save({ name: "jojo" });
      const token = await getJWTFor({ email: "admin@site.com", role: "admin" });

      const res = await client.mutate({
        mutation: deleteWilderMutation,
        fetchPolicy: "no-cache",
        variables: { deleteWilderId: wilder.id },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      expect((await res).data.deleteWilder).toBe(true);
      expect(await db.getRepository(Wilder).count()).toBe(0);
      */
    });
  });
});
