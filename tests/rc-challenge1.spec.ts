import { test, expect } from '@playwright/test';

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

})