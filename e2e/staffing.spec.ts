import { test, expect } from '@playwright/test'

test.describe('Staffing site (non-demo mode)', () => {
  test('homepage renders hero content from Drupal', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('body')).toContainText('The Right Talent')
    await expect(page.locator('body')).toContainText('Vanguard Staffing Solutions')
  })

  test('homepage shows stats section', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('body')).toContainText('12,000+')
    await expect(page.locator('body')).toContainText('Placements Made')
  })

  test('homepage shows featured jobs', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('body')).toContainText('Featured Jobs')
  })

  test('jobs listing page shows job openings', async ({ page }) => {
    await page.goto('/jobs')
    await expect(page.locator('h1')).toContainText('Job Openings')
    await expect(page.locator('body')).toContainText('Senior Software Engineer')
    await expect(page.locator('body')).toContainText('Marketing Director')
    await expect(page.locator('body')).toContainText('Financial Controller')
  })

  test('job detail page shows full content', async ({ page }) => {
    await page.goto('/jobs/senior-software-engineer')
    await expect(page.locator('h1')).toContainText('Senior Software Engineer')
    await expect(page.locator('body')).toContainText('NovaPay Technologies')
    await expect(page.locator('body')).toContainText('San Francisco')
  })

  test('industries listing page shows industries', async ({ page }) => {
    await page.goto('/industries')
    await expect(page.locator('h1')).toContainText('Industries')
    await expect(page.locator('body')).toContainText('Technology')
    await expect(page.locator('body')).toContainText('Healthcare')
    await expect(page.locator('body')).toContainText('Finance')
  })

  test('team listing page shows team members', async ({ page }) => {
    await page.goto('/team')
    await expect(page.locator('h1')).toContainText('Our Team')
    await expect(page.locator('body')).toContainText('Diana Flores')
  })

  test('news listing page shows articles', async ({ page }) => {
    await page.goto('/news')
    await expect(page.locator('h1')).toContainText('News')
    await expect(page.locator('body')).toContainText('Hiring Trends')
    await expect(page.locator('body')).toContainText('Resume Tips')
  })

  test('about page renders via catch-all route', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('h1')).toContainText('About Vanguard')
  })

  test('navigation links are present', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('a[href="/jobs"]').first()).toBeVisible()
    await expect(page.locator('a[href="/industries"]').first()).toBeVisible()
    await expect(page.locator('a[href="/team"]').first()).toBeVisible()
    await expect(page.locator('a[href="/news"]').first()).toBeVisible()
  })
})
