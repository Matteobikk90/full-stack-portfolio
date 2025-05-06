
import { expect, test } from '@playwright/test';

test('toggles theme when clicking button', async ({ page }) => {
  await page.goto('/');

  const button = page.getByRole('button', { name: /toggle theme/i });
  const html = page.locator('html');

  const initialClass = await html.getAttribute('class');

  await expect(button).toBeVisible();
  await button.click();

  const updatedClass = await html.getAttribute('class');

  expect(initialClass).not.toBe(updatedClass);
});