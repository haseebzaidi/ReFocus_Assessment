import { test, expect } from '@playwright/test';
import { PurchaseWorkflow } from '../pages/purchase_workflow';
import { testData } from '../utils/test_data';

test.describe('E2E Optimized Assessment Flow', () => {
  let workflow: PurchaseWorkflow;

  test.beforeEach(async ({ page }) => {
    workflow = new PurchaseWorkflow(page);
    await workflow.performLogin();
  });

  test('Complete purchase flow using service abstraction', async ({ page }) => {
    // 1. Add products via service
    await workflow.addProductsToCart(testData.products);

    // 2. Complete checkout and extract data
    const orderData = await workflow.completeCheckout();

    // 3. Assert and Save
    expect(orderData.confirmationMessage).toBe('Thank you for your order!');
    workflow.saveOrderSummary(orderData);
  });
});
