import { test, expect } from '@playwright/test';

test.describe('rc-suite2', () =>{ 
  
      test.beforeEach(async ({page}) => {

      page.goto('http://www.uitestingplayground.com/');

      
    })


test('auto-wait 2', async ({ page }) => {

  await page.getByRole('link', {name: "AJAX Data"}).click();
  await page.getByText('Button Triggering AJAX Request').click()


  const successButton = page.locator('.bg-success');
  await successButton.click();

  const text = await successButton.textContent();
  expect(text).toContain('Data loaded with AJAX get request.')
 

});

test('scrollbar', async ({ page }) => {

    await page.getByRole('link', {name: "Scrollbars"}).click();
    
     // Step 2: Locate the scrollable container
  const scrollableContainer = page.locator('div[style*="overflow"]');
  // Explanation: We select the div element with `overflow` style since it indicates it's scrollable.

  // Step 3: Scroll down to bring the button into the vertical view
  await scrollableContainer.evaluate((container) => {
    container.scrollTop = container.scrollHeight;
  });
  // Explanation: `scrollTop` adjusts the vertical position of the scroll bar to the maximum height.

  // Step 4: Scroll right to bring the button into the horizontal view
  await scrollableContainer.evaluate((container) => {
    container.scrollLeft = container.scrollWidth;
  });
  // Explanation: `scrollLeft` adjusts the horizontal position of the scroll bar to the maximum width.

  // Step 5: Locate the button inside the scrollable container
  const hidingButton = page.locator('text=Hiding Button');
  // Explanation: The button is located using its visible text, "Hiding Button."

  // Step 6: Wait for the button to be visible and assert its visibility
  await expect(hidingButton).toBeVisible({ timeout: 5000 });
  // Explanation: This ensures the button is visible on the screen within 5 seconds.

  // Step 7: Click the button
  await hidingButton.click();
  // Explanation: Perform a click action on the button.

  // Step 8: Assert the button click was successful (if needed)
  // Example: Assert the button is still visible or some state changes.
  await expect(hidingButton).toBeVisible(); // Replace with another assertion if needed.
   
  
  });
  


});