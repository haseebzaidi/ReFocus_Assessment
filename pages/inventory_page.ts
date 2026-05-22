import { Page, Locator } from '@playwright/test';
import { BasePage } from './base_page';

export class InventoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getAddToCartButton(productName: string): Locator {
    // Dynamic XPath for product addition
    return this.page.locator(`//div[@data-test='inventory-item'][.//div[@data-test='inventory-item-name' and contains(normalize-space(), '${productName}')]]//button[normalize-space()='Add to cart']`);
  }

  async addProductToCart(productName: string) {
    await this.retryAction(async () => {
      await this.clickElement(this.getAddToCartButton(productName));
    });
  }

  async goToCart() {
    await this.clickElement(this.getLocatorByDataTest('shopping-cart-link'));
  }

  async getCartBadgeCount(): Promise<string> {
    const badge = this.getLocatorByDataTest('shopping-cart-badge');
    await badge.waitFor({ state: 'visible' });
    return await badge.innerText();
  }
}
