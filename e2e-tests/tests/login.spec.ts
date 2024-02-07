import { test, expect } from "@playwright/test";
import User, { hashPassword } from "../../backend/src/entities/user";
import { closeDB, initDB } from "./helpers";
import { clearDB } from "../../backend/src/db";

test.beforeAll(initDB);

test.beforeEach(async () => {
  await clearDB();
  await createUser();
});

test.afterAll(closeDB);

const email = "user@app.com";
const password = "mysuperpassword";

async function createUser() {
  const hashedPassword = await hashPassword(password);
  await User.create({ email, hashedPassword, nickname: "user" }).save();
}

test("can connect with correct credentials", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await expect(page).toHaveTitle(/Se connecter - TGC/);
  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill(password);
  await page.getByRole("button", { name: "Se Connecter" }).click();
  await expect(
    page.getByRole("button", { name: "Se Déconnecter" })
  ).toBeVisible();
});

test("cannot connect with incorrect password", async ({ page }) => {
  await createUser();
  await page.goto("http://localhost:3000/login");
  await expect(page).toHaveTitle(/Se connecter - TGC/);
  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill("notcorrect");
  await page.getByRole("button", { name: "Se Connecter" }).click();
  await expect(page.getByText("identifiants incorrects")).toBeVisible();
});
