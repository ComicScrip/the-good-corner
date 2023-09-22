import db from "./db";
import { Ad } from "./entities/ad";
import { Category } from "./entities/category";
import { Tag } from "./entities/tag";

async function clearDB() {
  const runner = db.createQueryRunner();
  await runner.query("PRAGMA foreign_keys=OFF");
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`DROP TABLE IF EXISTS ${entity.tableName}`)
    )
  );
  await runner.query("PRAGMA foreign_keys=ON");
  await db.synchronize();
}

async function main() {
  await db.initialize();
  await clearDB();

  const ad1 = Ad.create({
    title: "Macbook",
    description: "description of the computer...",
    owner: "Pierre",
    price: 1500,
    picture:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-config-20220606?wid=820&hei=498&fmt=jpeg&qlt=90&.v=1654122880566",
    location: "Lyon",
  });
  const ad2 = Ad.create({
    title: "Macbook pro",
    description: "description of the computer...",
    owner: "Jane",
    price: 2000,
    picture:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-config-20220606?wid=820&hei=498&fmt=jpeg&qlt=90&.v=1654122880566",
    location: "Paris",
  });
  const cat1 = Category.create({ name: "informatique" });
  const cat2 = Category.create({ name: "voitures" });
  const tag1 = Tag.create({ name: "tag1" });
  const tag2 = Tag.create({ name: "tag2" });
  const tag3 = Tag.create({ name: "tag3" });

  ad1.category = cat1;
  ad1.tags = [tag1, tag2];

  ad2.category = cat2;
  ad2.tags = [tag2, tag3];

  await ad1.save();
  await ad2.save();
}

main();
