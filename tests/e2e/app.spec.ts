import { test, expect } from "@playwright/test";

test.describe("Habit Tracker app", () => {
  test("shows the splash screen and redirects unauthenticated users to /login", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByTestId("splash-screen")).toBeVisible();
    await page.waitForURL("**/login", { timeout: 5000 });
  });

  test("redirects authenticated users from / to /dashboard", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "habit-tracker-users",
        JSON.stringify([
          { id: "u", email: "a@b.com", password: "pw", createdAt: "" },
        ]),
      );

      localStorage.setItem(
        "habit-tracker-session",
        JSON.stringify({ userId: "u", email: "a@b.com" }),
      );
    });

    await page.goto("/");
    await page.waitForURL("**/dashboard");

    await expect(page.getByTestId("dashboard-page")).toBeVisible();
  });

  test("prevents unauthenticated access to /dashboard", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForURL("**/login");
  });

  test("signs up a new user and lands on the dashboard", async ({ page }) => {
    await page.goto("/signup");

    await page.getByTestId("auth-signup-email").fill("new@b.com");
    await page.getByTestId("auth-signup-password").fill("pw12345");
    await page.getByTestId("auth-signup-submit").click();

    await page.waitForURL("**/dashboard");
    await expect(page.getByTestId("dashboard-page")).toBeVisible();
  });

  test("logs in an existing user and loads only that user's habits", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "habit-tracker-users",
        JSON.stringify([
          { id: "u1", email: "a@b.com", password: "pw", createdAt: "" },
          { id: "u2", email: "b@b.com", password: "pw", createdAt: "" },
        ]),
      );

      localStorage.setItem(
        "habit-tracker-habits",
        JSON.stringify([
          {
            id: "h1",
            userId: "u1",
            name: "Mine",
            description: "",
            frequency: "daily",
            createdAt: "",
            completions: [],
          },
          {
            id: "h2",
            userId: "u2",
            name: "Theirs",
            description: "",
            frequency: "daily",
            createdAt: "",
            completions: [],
          },
        ]),
      );
    });

    await page.goto("/login");

    await page.getByTestId("auth-login-email").fill("a@b.com");
    await page.getByTestId("auth-login-password").fill("pw");
    await page.getByTestId("auth-login-submit").click();

    await page.waitForURL("**/dashboard");

    await expect(page.getByTestId("habit-card-mine")).toBeVisible();
    await expect(page.getByTestId("habit-card-theirs")).toHaveCount(0);
  });

  test("creates a habit from the dashboard", async ({ page }) => {
    await page.goto("/signup");

    await page.getByTestId("auth-signup-email").fill("c@b.com");
    await page.getByTestId("auth-signup-password").fill("pw");
    await page.getByTestId("auth-signup-submit").click();

    await page.waitForURL("**/dashboard");

    await page.getByTestId("create-habit-button").click();
    await page.getByTestId("habit-name-input").fill("Drink Water");
    await page.getByTestId("habit-save-button").click();

    await expect(page.getByTestId("habit-card-drink-water")).toBeVisible();
  });

  test("completes a habit for today and updates the streak", async ({
    page,
  }) => {
    await page.goto("/signup");

    await page.getByTestId("auth-signup-email").fill("d@b.com");
    await page.getByTestId("auth-signup-password").fill("pw");
    await page.getByTestId("auth-signup-submit").click();

    await page.waitForURL("**/dashboard");

    await page.getByTestId("create-habit-button").click();
    await page.getByTestId("habit-name-input").fill("Read");
    await page.getByTestId("habit-save-button").click();

    await expect(page.getByTestId("habit-streak-read")).toContainText("0");

    await page.getByTestId("habit-complete-read").click();

    await expect(page.getByTestId("habit-streak-read")).toContainText("1");
  });

  test("persists session and habits after page reload", async ({ page }) => {
    await page.goto("/signup");

    await page.getByTestId("auth-signup-email").fill("e@b.com");
    await page.getByTestId("auth-signup-password").fill("pw");
    await page.getByTestId("auth-signup-submit").click();

    await page.waitForURL("**/dashboard");

    await page.getByTestId("create-habit-button").click();
    await page.getByTestId("habit-name-input").fill("Walk");
    await page.getByTestId("habit-save-button").click();

    await page.reload();

    await expect(page.getByTestId("habit-card-walk")).toBeVisible();
  });

  test("logs out and redirects to /login", async ({ page }) => {
    await page.goto("/signup");

    await page.getByTestId("auth-signup-email").fill("f@b.com");
    await page.getByTestId("auth-signup-password").fill("pw");
    await page.getByTestId("auth-signup-submit").click();

    await page.waitForURL("**/dashboard");

    await page.getByTestId("auth-logout-button").click();

    await page.waitForURL("**/login");
  });

  test("loads the cached app shell when offline after the app has been loaded once", async ({
    page,
    context,
  }) => {
    await page.goto("/login");

    await page
      .waitForFunction(
        () => navigator.serviceWorker.controller !== null,
        null,
        { timeout: 8000 },
      )
      .catch(() => {});

    await context.setOffline(true);

    await page.goto("/login");

    await expect(page.locator("body")).toBeVisible();

    await context.setOffline(false);
  });
});
