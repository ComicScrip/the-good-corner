import { expect, test } from "@playwright/test";
import { connect, disconnect } from "./dbHelpers";
import { hash } from "argon2";
import User from "../../backend/src/entities/user";
import db, { clearDB } from "../../backend/src/db";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test("can log in with correct credentials", async ({ page }) => {
  await page.goto("/login");

  const email = "dave.lopper@website.com";
  const password = "1T!ESTINng";
  const hashedPassword = await hash(password);
  await User.create({ email, hashedPassword, nickname: "Dave" }).save();

  await page.goto("/login");
  await page.getByTestId("login-email").type(email);
  await page.getByTestId("login-password").type(password);
  await page.getByRole("button", { name: "Se Connecter" }).click();
  await expect(
    page.getByRole("button", { name: "Se Déconnecter" })
  ).toBeVisible();
});
