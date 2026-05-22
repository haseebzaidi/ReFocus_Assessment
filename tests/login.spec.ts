import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login_page';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate(process.env.BASE_URL!);
  });

  test('Successful login with valid credentials', async ({ page }) => {
    await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
    
    // Verify login success by checking if the products header is visible
    const productsHeader = page.locator('.title');
    await expect(productsHeader).toBeVisible();
    await expect(productsHeader).toHaveText('Products');
  });
});
