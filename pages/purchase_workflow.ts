import { Page, test } from '@playwright/test';
import { LoginPage } from './login_page';
import { InventoryPage } from './inventory_page';
import { CartPage, CheckoutPage } from './cart_page';
import { faker } from '@faker-js/faker';
import * as fs from 'fs';
import * as path from 'path';

export class PurchaseWorkflow {
  private loginPage: LoginPage;
  private inventoryPage: InventoryPage;
  private cartPage: CartPage;
  private checkoutPage: CheckoutPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.inventoryPage = new InventoryPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
  }

  async performLogin() {
    await test.step('Workflow: Login', async () => {
      await this.loginPage.navigate(process.env.BASE_URL!);
      await this.loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
    });
  }

  async addProductsToCart(products: string[]) {
    await test.step(`Workflow: Add products to cart (${products.join(', ')})`, async () => {
      for (const product of products) {
        await this.inventoryPage.addProductToCart(product);
      }
    });
  }

  async completeCheckout() {
    return await test.step('Workflow: Checkout and extraction', async () => {
      await this.inventoryPage.goToCart();
      await this.cartPage.clickCheckout();

      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const postalCode = faker.string.numeric(5);

      await this.checkoutPage.fillInformation(firstName, lastName, postalCode);
      const overviewData = await this.checkoutPage.getOverviewData();

      await this.checkoutPage.finishCheckout();
      const confirmationMessage = await this.checkoutPage.getCompleteHeader();

      return { ...overviewData, confirmationMessage };
    });
  }

  saveOrderSummary(data: any) {
    test.step('Action: Save order summary to JSON', () => {
      const resultsPath = path.resolve(__dirname, '../results');
      if (!fs.existsSync(resultsPath)) {
        fs.mkdirSync(resultsPath);
      }
      fs.writeFileSync(
        path.join(resultsPath, 'order_summary.json'),
        JSON.stringify(data, null, 2)
      );
    });
  }
}
