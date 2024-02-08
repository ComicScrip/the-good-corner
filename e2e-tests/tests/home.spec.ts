import { test, expect } from "@playwright/test";
import { Ad } from "../../backend/src/entities/ad";
import { initDB, closeDB } from "./helpers";
import { clearDB } from "../../backend/src/db";
import { Category } from "../../backend/src/entities/category";
import User, { hashPassword } from "../../backend/src/entities/user";

import config from "../playwright.config";

test.beforeAll(initDB);
test.beforeEach(clearDB);
test.afterAll(closeDB);

test.only("can view ads in db", async ({ page }) => {
  // Annonces Récentes
  const computerCat = await Category.create({ name: "informatique" }).save();
  console.log("hellllllo");

  const carCat = await Category.create({ name: "automobile" }).save();
  const admin = await User.create({
    email: "admin@app.com",
    hashedPassword: await hashPassword("adminadmin"),
    avatar:
      "https://www.shutterstock.com/image-vector/user-icon-vector-600nw-393536320.jpg",
    nickname: "Admin",
    role: "admin",
  }).save();
  const visitor = await User.create({
    email: "visitor@app.com",
    hashedPassword: await hashPassword("wildwildwest"),
    nickname: "Visitor",
  }).save();

  const keyboard = await Ad.create({
    title: "Clavier logitech",
    description:
      "Clavier Bluetooth® fin et minimaliste avec des touches personnalisables.",
    price: 30,
    picture:
      "https://resource.logitech.com/w_800,c_lpad,ar_16:9,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/keyboards/pebble-keys-2-k380s/gallery/pebble-keys-2-k380s-top-tonal-graphite-gallery-ch.png?v=1",
    location: "Paris",
    category: computerCat,
    owner: visitor,
  }).save();
  const peugeot = await Ad.create({
    title: "Peugeot 206",
    description: "Diesel, 150000km, etat correct. CT effectué il y a 3 mois",
    price: 4000,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/d/d9/Peugeot_206_Quicksilver_90.jpg",
    location: "Paris",
    category: carCat,
    owner: admin,
  }).save();

  console.log({ baseURL: config.use.baseURL });
  await page.goto(config.use.baseURL + "/");
  await page.getByRole("heading", { name: "Annonces Récentes" });

  await expect(page.getByTestId("ads-list")).toContainText(peugeot.title);
  await expect(page.getByTestId("ads-list")).toContainText(
    peugeot.price.toString()
  );
  await expect(page.getByTestId("ads-list")).toContainText(peugeot.title);
  await expect(page.getByTestId("ads-list")).toContainText(keyboard.title);
  await expect(page.getByTestId("ads-list")).toContainText(
    keyboard.price.toString()
  );
});
