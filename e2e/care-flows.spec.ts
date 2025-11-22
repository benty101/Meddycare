import { test, expect } from '@playwright/test';

test.describe('Get Care Flow', () => {
    test('should load the get care page', async ({ page }) => {
        await page.goto('/get-care');

        // Verify page loaded
        await expect(page.getByText('Find the Perfect Care')).toBeVisible();

        // Verify wizard is visible
        await expect(page.getByText('Who is the care for?')).toBeVisible();

        // Verify navigation buttons exist
        await expect(page.getByRole('button', { name: /Next Step/i })).toBeVisible();
    });

    test('should load the home page', async ({ page }) => {
        await page.goto('/');

        // Verify hero section loads
        await expect(page.getByText(/Care That Feels Like Family/i)).toBeVisible();

        // Verify CTA buttons
        await expect(page.getByRole('link', { name: /Find Care Now/i })).toBeVisible();
    });

    test('should load the become a carer page', async ({ page }) => {
        await page.goto('/become-a-carer');

        // Verify page loads
        await expect(page.getByText(/Start Your Caring Career/i)).toBeVisible();
    });
});
