import { expect, test } from '@playwright/test';

test('toggles theme from header button', async ({ page }) => {
  await page.goto('/');

  const toggleButton = page.getByTestId('theme-toggle');
  console.log('Toggle button found:', toggleButton);
  const html = page.locator('html');

  const initialClass = await html.getAttribute('class');
  const newClass = await html.getAttribute('class');
  console.log('HTML class changed to:', newClass);

  await toggleButton.click();

  await expect.poll(() => html.getAttribute('class')).not.toBe(initialClass);
});
