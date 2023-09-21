import db from "./db";
import { Ad } from "./entities/ad";

async function main() {
  await db.initialize();
  await Ad.create({
    title: "Macbook",
    description: "description of the computer...",
    owner: "Pierre",
    price: 1500,
    picture:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-config-20220606?wid=820&hei=498&fmt=jpeg&qlt=90&.v=1654122880566",
    location: "Lyon",
  }).save();
}

main();
