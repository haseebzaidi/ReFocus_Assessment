import { Page, Locator, expect, test } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await test.step(`Navigating to: ${url}`, async () => {
      await this.page.goto(url, { waitUntil: 'networkidle' });
    });
  }

  getLocatorByDataTest(dataTest: string): Locator {
    return this.page.locator(`[data-test="${dataTest}"]`);
  }

  async clickElement(locator: Locator | string, elementName?: string) {
    const target = typeof locator === 'string' ? this.page.locator(locator) : locator;
    const name = elementName || await target.getAttribute('data-test') || 'element';
    
    await test.step(`Clicking element: ${name}`, async () => {
      await expect(target).toBeVisible();
      await target.click();
    });
  }

  async typeText(locator: Locator | string, text: string, elementName?: string) {
    const target = typeof locator === 'string' ? this.page.locator(locator) : locator;
    const name = elementName || await target.getAttribute('data-test') || 'input';

    await test.step(`Typing into ${name}: ${text.includes('sauce') ? '****' : text}`, async () => {
      await expect(target).toBeVisible();
      await target.fill(text);
    });
  }

  async retryAction(action: () => Promise<void>, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        await action();
        return;
      } catch (error) {
        console.warn(`Action failed, retrying (${i + 1}/${retries})...`);
        if (i === retries - 1) throw error;
        await this.page.waitForTimeout(1000);
      }
    }
  }
}
