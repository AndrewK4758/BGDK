import { test, expect } from '@playwright/test';

const homeH1Title = "Hi, I'm Andrew Klapper";
test.describe('Test Layout & HomePage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Renders Menus when clicked', async ({ page }) => {
    await page.getByTestId('explore-button').click();
    await expect(page.getByTestId('home-button')).toBeVisible();
    await expect(page.getByTestId('games-button')).toBeVisible();
    await expect(page.getByTestId('crud-button')).toBeVisible();
    await expect(page.getByTestId('gen-ai-button')).toBeVisible();
  });

  test('has title', async ({ page }) => {
    expect(await page.locator('h1').innerText()).toContain(homeH1Title);
  });
});

test.describe('Test Header links & Email / Appointment Maker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Github Link', async ({ page }) => {
    await page.getByTestId('github-icon').click();
    await page.waitForURL('https://github.com/AndrewK4758');
    expect(page.url()).toBe('https://github.com/AndrewK4758');
  });

  test('Facebook Link', async ({ page }) => {
    await page.getByTestId('facebook-icon').click();
    await page.waitForURL('https://www.facebook.com/AKlapper47');
    expect(page.url()).toBe('https://www.facebook.com/AKlapper47');
  });

  test('LinkedIn Link', async ({ page }) => {
    await page.getByTestId('linkedin-icon').click();
    await page.waitForURL('https://www.linkedin.com/in/andrew-klapper-a9204b23b/');
    expect(page.url()).toBe('https://www.linkedin.com/in/andrew-klapper-a9204b23b/');
  });

  test('HuggingFace Link', async ({ page }) => {
    await page.getByTestId('huggingface-icon').click();
    await page.waitForURL('https://huggingface.co/ak475826');
    expect(page.url()).toBe('https://huggingface.co/ak475826');
  });

  test('X Link', async ({ page }) => {
    await page.getByTestId('x-icon').click();
    await page.waitForURL('https://x.com/ak475826');
    expect(page.url()).toBe('https://x.com/ak475826');
  });

  test('Email Dialog', async ({ page }) => {
    await page.getByTestId('email-icon').click();
    await expect(page.getByTestId('email-dialog')).toBeVisible();
  });
});
