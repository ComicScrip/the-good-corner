"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const ad_1 = require("../../backend/src/entities/ad");
const helpers_1 = require("./helpers");
const db_1 = require("../../backend/src/db");
const category_1 = require("../../backend/src/entities/category");
const user_1 = require("../../backend/src/entities/user");
const playwright_config_1 = require("../playwright.config");
test_1.test.beforeAll(helpers_1.initDB);
test_1.test.beforeEach(db_1.clearDB);
test_1.test.afterAll(helpers_1.closeDB);
test_1.test.only("can view ads in db", async ({ page }) => {
    // Annonces Récentes
    const computerCat = await category_1.Category.create({ name: "informatique" }).save();
    console.log("hellllllo");
    const carCat = await category_1.Category.create({ name: "automobile" }).save();
    const admin = await user_1.default.create({
        email: "admin@app.com",
        hashedPassword: await (0, user_1.hashPassword)("adminadmin"),
        avatar: "https://www.shutterstock.com/image-vector/user-icon-vector-600nw-393536320.jpg",
        nickname: "Admin",
        role: "admin",
    }).save();
    const visitor = await user_1.default.create({
        email: "visitor@app.com",
        hashedPassword: await (0, user_1.hashPassword)("wildwildwest"),
        nickname: "Visitor",
    }).save();
    const keyboard = await ad_1.Ad.create({
        title: "Clavier logitech",
        description: "Clavier Bluetooth® fin et minimaliste avec des touches personnalisables.",
        price: 30,
        picture: "https://resource.logitech.com/w_800,c_lpad,ar_16:9,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/keyboards/pebble-keys-2-k380s/gallery/pebble-keys-2-k380s-top-tonal-graphite-gallery-ch.png?v=1",
        location: "Paris",
        category: computerCat,
        owner: visitor,
    }).save();
    const peugeot = await ad_1.Ad.create({
        title: "Peugeot 206",
        description: "Diesel, 150000km, etat correct. CT effectué il y a 3 mois",
        price: 4000,
        picture: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Peugeot_206_Quicksilver_90.jpg",
        location: "Paris",
        category: carCat,
        owner: admin,
    }).save();
    console.log({ baseURL: playwright_config_1.default.use.baseURL });
    await page.goto(playwright_config_1.default.use.baseURL + "/");
    await page.getByRole("heading", { name: "Annonces Récentes" });
    await (0, test_1.expect)(page.getByTestId("ads-list")).toContainText(peugeot.title);
    await (0, test_1.expect)(page.getByTestId("ads-list")).toContainText(peugeot.price.toString());
    await (0, test_1.expect)(page.getByTestId("ads-list")).toContainText(peugeot.title);
    await (0, test_1.expect)(page.getByTestId("ads-list")).toContainText(keyboard.title);
    await (0, test_1.expect)(page.getByTestId("ads-list")).toContainText(keyboard.price.toString());
});
//# sourceMappingURL=home.spec.js.map