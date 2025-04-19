import { test, expect } from '@playwright/test';
import path from 'path'; // Import path module
import fs from 'fs';

//TESTS TO BE DONE
// Forgot Password ✅
// File Upload ✅
// Form Authentication ✅
// Input Field Validation (e.g., input filled, cleared, required) ✅
// Dropdown Selection Validation ✅
// Key Presses Handling (assert key result text) ✅
// Form Submission with Blank Inputs ✅
// Error Handling: Invalid Input Format (e.g., numbers in username) ✅
// Error Message Visibility Assertions ✅
// Successful Form Submission Flow 

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

test('Form Authentication', async({page}) => {
    // Navigate to the Form Authentication page
    await page.getByText('Form Authentication').click();

    // Fill in the username and password fields
    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('SuperSecretPassword!');

    // Click the login button
    await page.getByRole('button').click();

    // Verify successful login by asserting the expected text
    await expect(page.getByText('Welcome to the Secure Area', { exact: false })).toBeVisible();

})
test('input field', async({page})=>{
  await page.getByText('Form Authentication').click();   

  const usernameField = page.getByLabel('Username');
  const passwordField = page.getByLabel('Password');
  const loginButton = page.getByRole('button', { name: 'Login' });

  // Test required fields: click login without filling anything
  await loginButton.click();

  // Assert error message is visible
  await expect(page.locator('#flash')).toContainText('Your username is invalid!');

  // Fill username only, leave password blank
  await usernameField.fill('tomsmith');
  await passwordField.fill('');
  await loginButton.click();
  await expect(page.locator('#flash')).toContainText('Your password is invalid!');

  // Fill password only, leave username blank
  await usernameField.fill('');
  await passwordField.fill('SuperSecretPassword!');
  await loginButton.click();
  await expect(page.locator('#flash')).toContainText('Your username is invalid!');

  // Fill both fields, then clear them to test .clear()
  await usernameField.fill('tomsmith');
  await passwordField.fill('SuperSecretPassword!');
  await usernameField.clear();
  await passwordField.clear();

  // Fill both fields correctly and login
  await usernameField.fill('tomsmith');
  await passwordField.fill('SuperSecretPassword!');
  await loginButton.click();

  // Assert success after login
  await expect(page.getByRole('heading', { name: /Welcome to the Secure Area/i })).toBeVisible();

});

test('Dropdown Selection Validation', async({page})=>{
  await page.getByText('Dropdown').click();
  const dropdown = page.locator('#dropdown');
  await dropdown.selectOption('1'); // Select option 1
  await expect(dropdown).toHaveValue('1'); // Assert selected value is '1'
  await dropdown.selectOption('2'); // Select option 2
  await expect(dropdown).toHaveValue('2'); // Assert selected value is '2'
  await dropdown.selectOption(''); // Deselect all options
  
});

test('dropdown selection', async({page})=>{
  await page.getByText('Dropdown').click();
  const dropdown = page.locator('#dropdown');
  await dropdown.selectOption('1'); // Select option 1
  await expect(dropdown).toHaveValue('1'); // Assert selected value is '1'
  await dropdown.selectOption('2'); // Select option 2
  await expect(dropdown).toHaveValue('2'); // Assert selected value is '2'
  await dropdown.selectOption(''); // Deselect all options
});

test('Key Presses Handling', async({page})=>{
  await page.getByText('Key Presses').click();
  const inputField = page.locator('#target');
  await inputField.fill(''); // Clear any existing text
  await inputField.type('A'); // Type 'A' into the input field
  const resultText = page.locator('#result'); // Locate the result text element
  await expect(resultText).toHaveText('You entered: A'); // Assert the result text is as expected
});

test('Form Submission with Blank Inputs', async({page})=>{
  await page.getByText('Form Authentication').click();   

  const usernameField = page.getByLabel('Username');
  const passwordField = page.getByLabel('Password');
  const loginButton = page.getByRole('button', { name: 'Login' });

  // Test required fields: click login without filling anything
  await loginButton.click();

  // Assert error message is visible
  await expect(page.locator('#flash')).toContainText('Your username is invalid!');
});
test('Error Handling: Invalid Input Format', async({page})=>{
  await page.getByText('Form Authentication').click();   

  const usernameField = page.getByLabel('Username');
  const passwordField = page.getByLabel('Password');
  const loginButton = page.getByRole('button', { name: 'Login' });

  // Fill in invalid username format (numbers only)
  await usernameField.fill('1234567890');
  await passwordField.fill('SuperSecretPassword!');
  await loginButton.click();

  // Assert error message is visible
  await expect(page.locator('#flash')).toContainText('Your username is invalid!');
});
test('Error Message Visibility Assertions', async({page})=>{
  await page.getByText('Form Authentication').click();   

  const usernameField = page.getByLabel('Username');
  const passwordField = page.getByLabel('Password');
  const loginButton = page.getByRole('button', { name: 'Login' });

  // Fill in invalid username format (numbers only)
  await usernameField.fill('1234567890');
  await passwordField.fill('SuperSecretPassword!');
  await loginButton.click();

  // Assert error message is visible
  await expect(page.locator('#flash')).toContainText('Your username is invalid!');
});
test('Successful Form Submission Flow', async({page})=>{
  await page.getByText('Form Authentication').click();   

  const usernameField = page.getByLabel('Username');
  const passwordField = page.getByLabel('Password');
  const loginButton = page.getByRole('button', { name: 'Login' });

  // Fill in valid credentials
  await usernameField.fill('tomsmith');
  await passwordField.fill('SuperSecretPassword!');
  await loginButton.click();

  // Assert successful login by checking for a specific element or text
  await expect(page.getByText('Welcome to the Secure Area')).toBeVisible();
});
})