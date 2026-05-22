import { Page } from '@playwright/test';
import { BasePage } from './base_page';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await this.typeText(this.getLocatorByDataTest('username'), username);
    await this.typeText(this.getLocatorByDataTest('password'), password);
    await this.clickElement(this.getLocatorByDataTest('login-button'));
  }
}
