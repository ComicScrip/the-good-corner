import { test, expect } from "@playwright/test";
import { connect, disconnect } from "./dbHelpers";
import { clearDB } from "../../backend/src/db";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test("can sign up with correct info", async ({ page }) => {
  await page.goto("/signup");

  await page.getByTestId("signup-email").type("test@example.com");
  await page.getByTestId("signup-nickname").type("Dave");
  await page.getByTestId("signup-password").type("1T!zeufhizuhef");
  await page.getByRole("button", { name: "Creer mon compte" }).click();

  await expect(page).toHaveURL(/.*me/);
  await expect(
    page.getByRole("button", { name: "Se Déconnecter" })
  ).toBeVisible();
});
