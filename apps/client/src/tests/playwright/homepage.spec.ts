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
