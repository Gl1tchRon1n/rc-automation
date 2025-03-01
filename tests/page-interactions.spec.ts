import { test, expect } from '@playwright/test';


//TESTS TO BE DONE
// Auto Wait X
// Dialog Alert Button
// Modals & Popups
// Frames & Iframes
// Navigation & Redirects
// Dynamic Content
// Lazy Loading

test.describe('page interactions', () =>{ 
  
      test.beforeEach(async ({page}) => {

      page.goto('http://www.uitestingplayground.com/');
      
    })



test('Auto Wait Functionality Test', async ({page}) =>{

    await page.getByRole('link', {name: "Auto Wait"}).click();

     // Step 1: Select "Button" in the dropdown
    const dropdown = page.getByRole('combobox', { name: 'Choose an element type' });
    await dropdown.selectOption('Button'); // Select the "Button" option

    // Step 2: Ensure all checkboxes are selected (Visible, Enabled, Editable, etc.)
    const checkboxes = [
    'Visible',
    'Enabled',
    'Editable',
    'On Top',
    'Non Zero Size'
    ];
      for (const checkboxName of checkboxes) {
    const checkbox = page.getByRole('checkbox', { name: checkboxName });
    const isChecked = await checkbox.isChecked();
    if (!isChecked) {
      await checkbox.check();
    }
    await expect(checkbox).toBeChecked();
  }

   // Step 3: Click on the "Apply 5s" button to introduce a delay
   const apply5sButton = page.getByRole('button', { name: 'Apply 5s' });
   await apply5sButton.click();

    // Step 4: Wait for the delay to finish and ensure the "Button" in the Playground is interactable
  const playgroundButton = page.getByRole('button', { name: 'Button' });
  await expect(playgroundButton).toBeEnabled(); // Ensure the button is enabled
  await expect(playgroundButton).toBeVisible(); // Ensure the button is visible
 
  // Step 5: Click the button in the Playground
  await playgroundButton.click();

   // Step 6: Verify status message (if any) after the click
   const statusMessage = page.locator('#opstatus'); // Assuming this updates after the button is clicked
   // Wait for the status message text to update to 'Target clicked'
await expect(statusMessage).toHaveText('Target clicked.', { timeout: 10000 });

// Log success
console.log('Test passed: Status message updated to "Target clicked" after clicking the button.');

})

});