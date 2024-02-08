"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const user_1 = require("../../backend/src/entities/user");
const helpers_1 = require("./helpers");
const db_1 = require("../../backend/src/db");
test_1.test.beforeAll(helpers_1.initDB);
test_1.test.beforeEach(async () => {
    await (0, db_1.clearDB)();
    await createUser();
});
test_1.test.afterAll(helpers_1.closeDB);
const email = "user@app.com";
const password = "mysuperpassword";
async function createUser() {
    const hashedPassword = await (0, user_1.hashPassword)(password);
    await user_1.default.create({ email, hashedPassword, nickname: "user" }).save();
}
(0, test_1.test)("can connect with correct credentials", async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await (0, test_1.expect)(page).toHaveTitle(/Se connecter - TGC/);
    await page.getByTestId("login-email").fill(email);
    await page.getByTestId("login-password").fill(password);
    await page.getByRole("button", { name: "Se Connecter" }).click();
    await (0, test_1.expect)(page.getByRole("button", { name: "Se Déconnecter" })).toBeVisible();
});
(0, test_1.test)("cannot connect with incorrect password", async ({ page }) => {
    await createUser();
    await page.goto("http://localhost:3000/login");
    await (0, test_1.expect)(page).toHaveTitle(/Se connecter - TGC/);
    await page.getByTestId("login-email").fill(email);
    await page.getByTestId("login-password").fill("notcorrect");
    await page.getByRole("button", { name: "Se Connecter" }).click();
    await (0, test_1.expect)(page.getByText("identifiants incorrects")).toBeVisible();
});
//# sourceMappingURL=login.spec.js.map