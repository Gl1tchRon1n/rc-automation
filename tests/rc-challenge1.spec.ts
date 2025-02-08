import { test, expect } from '@playwright/test';

test.setTimeout(30000);

test.describe('rc_challenges', () =>{ 
  
      test.beforeEach(async ({page}) => {

      page.goto('https://the-internet.herokuapp.com/');

      
    })

    test('basic auth', async ({page}) =>{

        // Set authentication credentials before navigating
    await page.context().setHTTPCredentials({
        username: 'admin',
        password: 'admin'
    });

    // Navigate to the Basic Auth page
    await page.goto('https://the-internet.herokuapp.com/basic_auth');

    // Verify successful login by asserting the expected text
    await expect(page.locator('h3')).toHaveText('Basic Auth');
    await expect(page.locator('p')).toHaveText('Congratulations! You must have the proper credentials.');

    })

    test('dropdown', async({page})=>{

        await page.getByRole('link', {name: "Dropdown"}).click()

        const dropdownMenu = page.locator("#dropdown")

        await dropdownMenu.click()
        
    // Step 3: Select "Option 1" from the dropdown
    await dropdownMenu.selectOption({ label: "Option 1" });

    // Step 4: Assert that "Option 1" is selected
    await expect(dropdownMenu).toHaveValue("1"); // Assuming "1" is the value attribute for Option 1

    // Step 5: Select "Option 2" from the dropdown
    await dropdownMenu.selectOption({ label: "Option 2" });

    // Step 6: Assert that "Option 2" is selected
    await expect(dropdownMenu).toHaveValue("2"); // Assuming "2" is the value attribute for Option 2
    })

test('javascript alert buttons', async({page}) =>{
    await page.getByRole('link', {name: 'JavaScript Alerts'}).click()

    // Click the button
    await page.getByRole('button',{name: 'Click for JS Alert'}).click()

    // Give a short wait to ensure the page registers the button click
    await page.waitForTimeout(500); 

    //dialog is an event handler. 
    page.once('dialog', async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`); // Log message for debugging
        await dialog.accept(); // Accept the alert
    });

    // Verify the result text is updated
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
    
    
    //await page.getByRole('button',{name: 'Click for JS Confirm'}).click()


    //await page.getByRole('button',{name: 'Click for JS Prompt'}).click()


}) 
})