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
  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill(password);
  await page.getByRole("button", { name: "Se Connecter" }).click();
  await expect(
    page.getByRole("button", { name: "Se Déconnecter" })
  ).toBeVisible();
});

test("cannot log in with incorrect password", async ({ page }) => {
  const email = "dave.lopper@website.com";
  const password = "1T!ESTINng";
  const hashedPassword = await hash(password);
  await User.create({ email, hashedPassword, nickname: "Dave" }).save();

  await page.goto("/login");
  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill("notcorrect");
  await page.getByRole("button", { name: "Se Connecter" }).click();
  await expect(page.getByText("Identifiants incorrects")).toBeVisible();
});

test("cannot log in with incorrect email", async ({ page }) => {
  const email = "dave.lopper@website.com";
  const password = "1T!ESTINng";
  const hashedPassword = await hash(password);
  await User.create({ email, hashedPassword, nickname: "Dave" }).save();

  await page.goto("/login");
  await page.getByTestId("login-email").fill("not@correct.com");
  await page.getByTestId("login-password").fill(password);
  await page.getByRole("button", { name: "Se Connecter" }).click();
  await expect(page.getByText("Identifiants incorrects")).toBeVisible();
});
