import { test, expect } from '@playwright/test';
import fs from 'fs';


test.setTimeout(30000);

//TESTS TO BE DONE
// Dropdown X
// Checkboxes X
// Input Field X
// Slider X
// Basic Auth X
// File Upload
// Key Presses

test.describe('ui elements', () =>{ 
  
      test.beforeEach(async ({page}) => {

      page.goto('https://the-internet.herokuapp.com/');

      
    })

    test('checkboxes', async({page}) =>{
        await page.getByRole('link', {name: "Checkboxes"}).click()

        // Locate the first checkbox explicitly by index
        const firstCheckbox = (await page.locator('#checkboxes input').nth(0));
        const secondCheckbox = (await page.locator('#checkboxes input').nth(1));

        // Check first checkbox
        await firstCheckbox.check({ force: true });

        // Uncheck second checkbox (if needed)
        await secondCheckbox.uncheck({ force: true });

        // Assert that the first checkbox is checked
        await expect(firstCheckbox).toBeChecked();
        await expect(secondCheckbox).not.toBeChecked();
        
});

    
    
    test('input field', async({page})=>{
        await page.getByText('Form Authentication').click();
    
        const username = page.locator('#username');
        const password = page.locator('#password');
        const submit = page.locator('button[type="submit"]');

        await username.fill('tomsmith');
        await password.fill('SuperSecretPassword!');
        await submit.click();

        await expect(page.locator('h2')).toHaveText('Secure Area');
})

    test('slider', async({page})=>{
        await page.getByRole('link', {name: "Horizontal Slider"}).click()

        const sliderValue = page.locator('input[type="range"]');

        await sliderValue.fill('0');  
        await expect(sliderValue).toHaveValue('0'); 
        
        await sliderValue.fill('2.5');  
        await expect(sliderValue).toHaveValue('2.5');

        await sliderValue.fill('5');  
        await expect(sliderValue).toHaveValue('5'); 
    });



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

    test('file upload', async({page})=>{

    // Generate a test image dynamically
    const imgBuffer = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAA' +
        'HElEQVR42mNgGAWjYBSMglEwCYoI5YABBgAFAH+cGQiWAAAAAElFTkSuQmCC',
        'base64'
    );
    fs.writeFileSync('test-image.png', imgBuffer);

    // Navigate to the file upload page
    await page.getByRole('link', {name: "File Upload"}).click()

    // Upload the generated image
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('input[type="file"]').first().click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('test-image.png');

    // Click the upload button
    await page.locator('#file-submit').click();

    // Assert that the uploaded file name appears
    await expect(page.locator('#uploaded-files')).toHaveText('test-image.png');

    // Clean up (optional)
    fs.unlinkSync('test-image.png');

    })

   
});