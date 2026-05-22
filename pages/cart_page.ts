import { Page, Locator } from '@playwright/test';
import { BasePage } from './base_page';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getProductNames(): Promise<string[]> {
    return await this.getLocatorByDataTest('inventory-item-name').allInnerTexts();
  }

  async clickCheckout() {
    await this.getLocatorByDataTest('checkout').click();
  }
}

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.getLocatorByDataTest('firstName').fill(firstName);
    await this.getLocatorByDataTest('lastName').fill(lastName);
    await this.getLocatorByDataTest('postalCode').fill(postalCode);
    await this.getLocatorByDataTest('continue').click();
  }

  async getOverviewData() {
    const names = await this.getLocatorByDataTest('inventory-item-name').allInnerTexts();
    const prices = await this.getLocatorByDataTest('inventory-item-price').allInnerTexts();
    const subtotal = await this.getLocatorByDataTest('subtotal-label').innerText();
    const tax = await this.getLocatorByDataTest('tax-label').innerText();
    const total = await this.getLocatorByDataTest('total-label').innerText();

    return {
      products: names.map((name, index) => ({ name, price: prices[index] })),
      subtotal: subtotal.split('$')[1],
      tax: tax.split('$')[1],
      total: total.split('$')[1]
    };
  }

  async finishCheckout() {
    await this.getLocatorByDataTest('finish').click();
  }

  async getCompleteHeader(): Promise<string> {
    return await this.getLocatorByDataTest('complete-header').innerText();
  }
}
