import { expect, test } from "@playwright/test";
import { connect, disconnect } from "./dbHelpers";
import User, { hashPassword } from "../../backend/src/entities/user";
import { clearDB } from "../../backend/src/db";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test("can log in with correct credentials", async ({ page }) => {
  const email = "dave.lopper@website.com";
  const password = "1T!ESTINng";
  const hashedPassword = await hashPassword(password);
  await User.create({ email, hashedPassword, nickname: "Dave" }).save();

  await page.goto("http://localhost:3000/login");
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
  const hashedPassword = await hashPassword(password);
  await User.create({ email, hashedPassword, nickname: "Dave" }).save();

  await page.goto("http://localhost:3000/login");
  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill("notcorrect");
  await page.getByRole("button", { name: "Se Connecter" }).click();
  await expect(page.getByText("Identifiants incorrects")).toBeVisible();
});

test("cannot log in with incorrect email", async ({ page }) => {
  const email = "dave.lopper@website.com";
  const password = "1T!ESTINng";
  const hashedPassword = await hashPassword(password);
  await User.create({ email, hashedPassword, nickname: "Dave" }).save();

  await page.goto("http://localhost:3000/login");
  await page.getByTestId("login-email").fill("not@correct.com");
  await page.getByTestId("login-password").fill(password);
  await page.getByRole("button", { name: "Se Connecter" }).click();
  await expect(page.getByText("Identifiants incorrects")).toBeVisible();
});
