# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> Habit Tracker app >> persists session and habits after page reload
- Location: tests\e2e\app.spec.ts:146:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('habit-card-walk')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('habit-card-walk')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - button "Open Next.js Dev Tools" [ref=e7] [cursor=pointer]:
    - img [ref=e8]
  - alert [ref=e11]
  - generic [ref=e12]:
    - heading "Log in" [level=1] [ref=e13]
    - generic [ref=e14]:
      - generic [ref=e15]: Email
      - textbox [ref=e16]
    - generic [ref=e17]:
      - generic [ref=e18]: Password
      - textbox [ref=e19]
    - button "Log in" [ref=e20]
    - paragraph [ref=e21]:
      - text: No account?
      - link "Sign up" [ref=e22] [cursor=pointer]:
        - /url: /signup
```

# Test source

```ts
  61  |   }) => {
  62  |     await page.addInitScript(() => {
  63  |       localStorage.setItem(
  64  |         "habit-tracker-users",
  65  |         JSON.stringify([
  66  |           { id: "u1", email: "a@b.com", password: "pw", createdAt: "" },
  67  |           { id: "u2", email: "b@b.com", password: "pw", createdAt: "" },
  68  |         ]),
  69  |       );
  70  | 
  71  |       localStorage.setItem(
  72  |         "habit-tracker-habits",
  73  |         JSON.stringify([
  74  |           {
  75  |             id: "h1",
  76  |             userId: "u1",
  77  |             name: "Mine",
  78  |             description: "",
  79  |             frequency: "daily",
  80  |             createdAt: "",
  81  |             completions: [],
  82  |           },
  83  |           {
  84  |             id: "h2",
  85  |             userId: "u2",
  86  |             name: "Theirs",
  87  |             description: "",
  88  |             frequency: "daily",
  89  |             createdAt: "",
  90  |             completions: [],
  91  |           },
  92  |         ]),
  93  |       );
  94  |     });
  95  | 
  96  |     await page.goto("/login");
  97  | 
  98  |     await page.getByTestId("auth-login-email").fill("a@b.com");
  99  |     await page.getByTestId("auth-login-password").fill("pw");
  100 |     await page.getByTestId("auth-login-submit").click();
  101 | 
  102 |     await page.waitForURL("**/dashboard");
  103 | 
  104 |     await expect(page.getByTestId("habit-card-mine")).toBeVisible();
  105 |     await expect(page.getByTestId("habit-card-theirs")).toHaveCount(0);
  106 |   });
  107 | 
  108 |   test("creates a habit from the dashboard", async ({ page }) => {
  109 |     await page.goto("/signup");
  110 | 
  111 |     await page.getByTestId("auth-signup-email").fill("c@b.com");
  112 |     await page.getByTestId("auth-signup-password").fill("pw");
  113 |     await page.getByTestId("auth-signup-submit").click();
  114 | 
  115 |     await page.waitForURL("**/dashboard");
  116 | 
  117 |     await page.getByTestId("create-habit-button").click();
  118 |     await page.getByTestId("habit-name-input").fill("Drink Water");
  119 |     await page.getByTestId("habit-save-button").click();
  120 | 
  121 |     await expect(page.getByTestId("habit-card-drink-water")).toBeVisible();
  122 |   });
  123 | 
  124 |   test("completes a habit for today and updates the streak", async ({
  125 |     page,
  126 |   }) => {
  127 |     await page.goto("/signup");
  128 | 
  129 |     await page.getByTestId("auth-signup-email").fill("d@b.com");
  130 |     await page.getByTestId("auth-signup-password").fill("pw");
  131 |     await page.getByTestId("auth-signup-submit").click();
  132 | 
  133 |     await page.waitForURL("**/dashboard");
  134 | 
  135 |     await page.getByTestId("create-habit-button").click();
  136 |     await page.getByTestId("habit-name-input").fill("Read");
  137 |     await page.getByTestId("habit-save-button").click();
  138 | 
  139 |     await expect(page.getByTestId("habit-streak-read")).toContainText("0");
  140 | 
  141 |     await page.getByTestId("habit-complete-read").click();
  142 | 
  143 |     await expect(page.getByTestId("habit-streak-read")).toContainText("1");
  144 |   });
  145 | 
  146 |   test("persists session and habits after page reload", async ({ page }) => {
  147 |     await page.goto("/signup");
  148 | 
  149 |     await page.getByTestId("auth-signup-email").fill("e@b.com");
  150 |     await page.getByTestId("auth-signup-password").fill("pw");
  151 |     await page.getByTestId("auth-signup-submit").click();
  152 | 
  153 |     await page.waitForURL("**/dashboard");
  154 | 
  155 |     await page.getByTestId("create-habit-button").click();
  156 |     await page.getByTestId("habit-name-input").fill("Walk");
  157 |     await page.getByTestId("habit-save-button").click();
  158 | 
  159 |     await page.reload();
  160 | 
> 161 |     await expect(page.getByTestId("habit-card-walk")).toBeVisible();
      |                                                       ^ Error: expect(locator).toBeVisible() failed
  162 |   });
  163 | 
  164 |   test("logs out and redirects to /login", async ({ page }) => {
  165 |     await page.goto("/signup");
  166 | 
  167 |     await page.getByTestId("auth-signup-email").fill("f@b.com");
  168 |     await page.getByTestId("auth-signup-password").fill("pw");
  169 |     await page.getByTestId("auth-signup-submit").click();
  170 | 
  171 |     await page.waitForURL("**/dashboard");
  172 | 
  173 |     await page.getByTestId("auth-logout-button").click();
  174 | 
  175 |     await page.waitForURL("**/login");
  176 |   });
  177 | 
  178 |   test("loads the cached app shell when offline after the app has been loaded once", async ({
  179 |     page,
  180 |     context,
  181 |   }) => {
  182 |     await page.goto("/login");
  183 | 
  184 |     await page
  185 |       .waitForFunction(
  186 |         () => navigator.serviceWorker.controller !== null,
  187 |         null,
  188 |         { timeout: 8000 },
  189 |       )
  190 |       .catch(() => {});
  191 | 
  192 |     await context.setOffline(true);
  193 | 
  194 |     await page.goto("/login");
  195 | 
  196 |     await expect(page.locator("body")).toBeVisible();
  197 | 
  198 |     await context.setOffline(false);
  199 |   });
  200 | });
  201 | 
```