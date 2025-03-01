import { test, expect } from '@playwright/test';
import path from 'path'; // Import path module
import fs from 'fs';

//TESTS TO BE DONE
// Forgot Password X
// Form Authentication
// Sign-up Form
// Form Validation Errors
// Textarea Input
// Auto-complete Fields

test.describe('form validation', () =>{ 
  
    test.beforeEach(async ({page}) => {

    page.goto('https://the-internet.herokuapp.com/');

});

test('Forgot Password', async({page}) => {
    await page.getByText('Forgot Password').click();
    const inputBar = page.getByLabel('E-mail')
    await inputBar.fill('rb_corona')
    await page.getByRole('button').click();

     // Step 4: Assert that the "Internal Server Error" text is displayed
    const errorText = page.locator('text=Internal Server Error');
    await expect(errorText).toBeVisible(); // Ensure the error message is visible
})

test('File Upload', async({page}) => {
  // Navigate to the File Upload page
  await page.getByText('File Upload').click();

  // Step 2: Define the absolute file path for the file to be uploaded
  const filePath = path.resolve('C:/Users/rb_co/OneDrive/Desktop/Work/80261consent.pdf');

  // Step 3: Log the file path to confirm it resolves correctly
  console.log('Resolved file path:', filePath);

  // Steap 4: Make sure file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`File does not exist: ${filePath}`);
  }
 
  // Step 5: Locate the file input element using its unique id and set the file to upload
  const fileInput = page.locator('#file-upload');
  await fileInput.setInputFiles(filePath);

  // Step 6: Click the "Upload" button to initiate the upload
  await page.locator('#file-submit').click();

  // Step 7: Add an assertion to verify the success message is displayed
  const successMessage = page.locator('h3');
  await expect(successMessage).toHaveText('File Uploaded!');

  // Step 8: Verify the uploaded file name is displayed correctly
    const uploadedFileName = page.locator('#uploaded-files'); // Locate the div by its unique ID
    await expect(uploadedFileName).toHaveText('80261consent.pdf'); // Assert the file name matches exactly
})
})