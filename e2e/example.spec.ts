import { test, expect } from "@playwright/test";

test("is render", async ({ page }) => {
  await page.goto("http://localhost:5173");

  const innerText = await page.getByTestId("Apple-og-list").innerText();
  expect(innerText).toBe("Apple");
});

test("auto delete todo working as expected", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await page.getByTestId("Apple-og-list").click();
  const appleInType = page.getByTestId("Apple-Fruit-list");
  expect(await appleInType.isVisible()).toBeTruthy();
  await page.waitForTimeout(5000);
  expect(await appleInType.isVisible()).toBeFalsy();
  expect(await page.getByTestId("Apple-og-list").isVisible()).toBeTruthy();
});

test("manual delete todo working as expected", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await page.getByTestId("Apple-og-list").click();
  const appleInType = page.getByTestId("Apple-Fruit-list");
  expect(await appleInType.isVisible()).toBeTruthy();
  await appleInType.click();
  expect(await appleInType.isVisible()).toBeFalsy();
  expect(await page.getByTestId("Apple-og-list").isVisible()).toBeTruthy();
});

test("full behavior of delete todo working as expected", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await page.getByTestId("Apple-og-list").click();
  await page.getByTestId("Banana-og-list").click();
  const appleInType = page.getByTestId("Apple-Fruit-list");
  const bananaInType = page.getByTestId("Banana-Fruit-list");
  expect(await appleInType.isVisible()).toBeTruthy();
  expect(await bananaInType.isVisible()).toBeTruthy();
  await bananaInType.click();
  expect(await bananaInType.isVisible()).toBeFalsy();
  expect(await page.getByTestId("Banana-og-list").isVisible()).toBeTruthy();
  await page.waitForTimeout(5000);
  expect(await appleInType.isVisible()).toBeFalsy();
  expect(await page.getByTestId("Apple-og-list").isVisible()).toBeTruthy();
});
