import { test, expect } from '@playwright/test';

test.describe('rc-suite2', () =>{ 
  
      test.beforeEach(async ({page}) => {

      page.goto('http://www.uitestingplayground.com/');

      
    })


test('Button Click', async ({ page }) => {

  await page.getByRole('link', {name: "AJAX Data"}).click();
  await page.getByText('Button Triggering AJAX Request').click()


  const successButton = page.locator('.bg-success');
  await successButton.click();

  const text = await successButton.textContent();
  expect(text).toContain('Data loaded with AJAX get request.')
 

});


});