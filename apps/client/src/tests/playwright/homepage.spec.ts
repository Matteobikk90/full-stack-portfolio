import { expect, test } from '@playwright/test';

test('Home page renders with particle background and header', async ({
  page,
}) => {
  await page.goto('http://localhost:5173');

  await expect(page.locator('header')).toBeVisible();

  await expect(
    page.locator('text=React, TypeScript, Node.js, Prisma.')
  ).toBeVisible();

  await expect(page.locator('canvas')).toBeVisible();
});

test('toggles theme from header button', async ({ page }) => {
  await page.goto('http://localhost:5173');
  const toggleButton = page.locator('button').nth(0);
  const html = page.locator('html');

  const initialClass = await html.getAttribute('class');

  await toggleButton.click();

  const newClass = await html.getAttribute('class');
  expect(newClass).not.toBe(initialClass);
});
