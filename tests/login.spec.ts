import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login_page';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    const url = process.env.BASE_URL || 'https://www.saucedemo.com/';
    await loginPage.navigate(url);
  });

  test('Successful login with valid credentials', async ({ page }) => {
    const username = process.env.USER_NAME || 'standard_user';
    const password = process.env.PASSWORD || 'secret_sauce';
    await loginPage.login(username, password);
    
    // Verify login success by checking if the products header is visible
    const productsHeader = page.locator('.title');
    await expect(productsHeader).toBeVisible();
    await expect(productsHeader).toHaveText('Products');
  });
});
