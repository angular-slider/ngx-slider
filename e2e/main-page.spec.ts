import { test, expect } from '@playwright/test';

test('main page has expected title', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  await expect(page).toHaveTitle(/ngx-slider/);
});
