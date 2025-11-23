import { test, expect } from '@playwright/test';

test.describe('Full Platform E2E Flow', () => {
    const familyEmail = 'family@test.com';
    const carerEmail = 'carer@test.com';
    const password = 'password123';

    test('Family can login and view dashboard', async ({ page }) => {
        // Navigate to family login
        await page.goto('/login/family');

        // Fill in credentials
        await page.fill('input[type="email"]', familyEmail);
        await page.fill('input[type="password"]', password);

        // Click login button
        await page.click('button[type="submit"]');

        // Wait for navigation to dashboard
        await page.waitForURL('/dashboard/family', { timeout: 10000 });

        // Verify dashboard loaded
        await expect(page.locator('text=Welcome back')).toBeVisible();
        await expect(page.locator('text=Sarah')).toBeVisible();

        // Verify stats are visible
        await expect(page.locator('text=Active Care')).toBeVisible();
        await expect(page.locator('text=Current placements')).toBeVisible();
    });

    test('Family can view care logs', async ({ page }) => {
        // Login
        await page.goto('/login/family');
        await page.fill('input[type="email"]', familyEmail);
        await page.fill('input[type="password"]', password);
        await page.click('button[type="submit"]');
        await page.waitForURL('/dashboard/family');

        // Navigate to schedule
        await page.click('a[href="/dashboard/family/schedule"]');
        await page.waitForURL('/dashboard/family/schedule');

        // Verify care logs are visible
        await expect(page.locator('text=Care Schedule & History')).toBeVisible();

        // Check for sample log data we seeded
        const hasMood = await page.locator('text=Mood:').count() > 0;
        if (hasMood) {
            await expect(page.locator('text=good').or(page.locator('text=excellent'))).toBeVisible();
        }
    });

    test('Family can view and edit profile', async ({ page }) => {
        // Login
        await page.goto('/login/family');
        await page.fill('input[type="email"]', familyEmail);
        await page.fill('input[type="password"]', password);
        await page.click('button[type="submit"]');
        await page.waitForURL('/dashboard/family');

        // Navigate to profile
        await page.click('a[href="/dashboard/family/profile"]');
        await page.waitForURL('/dashboard/family/profile');

        // Verify profile form
        await expect(page.locator('text=My Profile')).toBeVisible();
        await expect(page.locator('input[type="email"]')).toBeDisabled();

        // Check if fields are populated
        const firstNameInput = page.locator('input').filter({ hasText: /sarah/i }).first();
        await expect(firstNameInput).toHaveValue(/sarah/i);
    });

    test('Carer can login and view dashboard', async ({ page }) => {
        // Navigate to carer login
        await page.goto('/login/carer');

        // Fill in credentials
        await page.fill('input[type="email"]', carerEmail);
        await page.fill('input[type="password"]', password);

        // Click login button
        await page.click('button[type="submit"]');

        // Wait for navigation to dashboard
        await page.waitForURL('/dashboard/carer', { timeout: 10000 });

        // Verify dashboard loaded
        await expect(page.locator('text=Welcome back')).toBeVisible();
        await expect(page.locator('text=Emily')).toBeVisible();

        // Verify stats are visible
        await expect(page.locator('text=Applications')).toBeVisible();
        await expect(page.locator('text=Hours This Week')).toBeVisible();
    });

    test('Carer can view applications', async ({ page }) => {
        // Login
        await page.goto('/login/carer');
        await page.fill('input[type="email"]', carerEmail);
        await page.fill('input[type="password"]', password);
        await page.click('button[type="submit"]');
        await page.waitForURL('/dashboard/carer');

        // Navigate to applications
        await page.click('a[href="/dashboard/carer/applications"]');
        await page.waitForURL('/dashboard/carer/applications');

        // Verify applications page
        await expect(page.locator('text=My Applications')).toBeVisible();
    });

    test('Carer can access inbox', async ({ page }) => {
        // Login
        await page.goto('/login/carer');
        await page.fill('input[type="email"]', carerEmail);
        await page.fill('input[type="password"]', password);
        await page.click('button[type="submit"]');
        await page.waitForURL('/dashboard/carer');

        // Navigate to inbox
        await page.click('a[href="/dashboard/carer/inbox"]');
        await page.waitForURL('/dashboard/carer/inbox');

        // Verify inbox loaded
        await expect(page.locator('text=Messages')).toBeVisible();
    });

    test('Carer can edit profile', async ({ page }) => {
        // Login
        await page.goto('/login/carer');
        await page.fill('input[type="email"]', carerEmail);
        await page.fill('input[type="password"]', password);
        await page.click('button[type="submit"]');
        await page.waitForURL('/dashboard/carer');

        // Navigate to profile
        await page.click('a[href="/dashboard/carer/profile"]');
        await page.waitForURL('/dashboard/carer/profile');

        // Verify profile form
        await expect(page.locator('text=Carer Profile')).toBeVisible();

        // Check bio field exists
        await expect(page.locator('textarea')).toBeVisible();

        // Check experience and rate fields
        await expect(page.locator('text=Years of Experience')).toBeVisible();
        await expect(page.locator('text=Hourly Rate')).toBeVisible();
    });

    test('Public pages are accessible', async ({ page }) => {
        // Test landing page
        await page.goto('/');
        await expect(page.locator('text=MeddyCare').first()).toBeVisible();

        // Test contact page
        await page.goto('/contact');
        await expect(page.locator('text=Get In Touch')).toBeVisible();
        await expect(page.locator('input[type="email"]')).toBeVisible();

        // Test about page
        await page.goto('/about');
        await expect(page.locator('h1')).toBeVisible();

        // Test get-care page
        await page.goto('/get-care');
        await expect(page.locator('text=Care').or(page.locator('text=Families'))).toBeVisible();

        // Test become-a-carer page
        await page.goto('/become-a-carer');
        await expect(page.locator('text=Carer').or(page.locator('text=Join'))).toBeVisible();
    });

    test('Navigation links work correctly', async ({ page }) => {
        await page.goto('/');

        // Check header navigation
        await expect(page.locator('a[href="/get-care"]')).toBeVisible();
        await expect(page.locator('a[href="/become-a-carer"]')).toBeVisible();

        // Check footer navigation (after scrolling)
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await expect(page.locator('footer a[href="/contact"]')).toBeVisible();
    });
});
