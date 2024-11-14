import { test, expect } from '@playwright/test';

test.describe('rc-tests', () =>{ 
  
      test.beforeEach(async ({page}) => {

      page.goto('http://www.uitestingplayground.com/');

      
    })


test('Button Click', async ({ page }) => {

  await page.getByRole('link', {name: "Visibility"}).click();

  const hideButton = page.getByRole('button', {name: "Hide"});

  await hideButton.click();

  await expect(hideButton).toHaveText('Hide');

 /* const buttonsToCheck = [
    'Removed',
    'Zero Width',
    'Overlapped',
    'Opacity 0',
    'Visibility Hidden',
    'Display None',
    'Offscreen'
  ];

  for (const buttonName of buttonsToCheck) {
    const button = page.getByRole('button', { name: buttonName });
    //await expect(button).not.toBeVisible({timeout: 15000});  // Assert button is hidden
    //await button.waitFor({ state: 'detached', timeout: 15000 });
  }*/

  //*Thus far, the test above is failing at expected assertion even with extended timeout. Keep working with it. 

});


test('Visibility Hidden', async ({ page }) => {

  await page.getByRole('link', {name: "Visibility"}).click();

    const visButton = page.getByRole('button', {name: "Visibility Hidden"});
  
    await visButton.click({force:true});




//test('get started link', async ({ page }) => {
 // await page.goto('https://playwright.dev/');

  // Click the get started link.
  //await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  //await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

});

test('input fields', async ({page}) =>{
  const inputField = await page.getByPlaceholder('MyButton')

  await page.getByRole('link', {name: "Text Input"}).click();
  await inputField.fill("Wassup G");
  await inputField.clear();
  await inputField.pressSequentially('Te Amo', {delay: 500})

  const inputValue = await inputField.inputValue()
  expect(inputValue).toEqual('Te Amo');
})

test('Extracting Values', async ({ page }) => {

  await page.getByRole('link', {name: "Visibility"}).click();

  const hideButton = page.getByRole('button', {name: "Hide"});

  const buttonText = await hideButton.textContent(); 

  expect(buttonText).toEqual("Hide"); //toEqual is a generic assertion that only goes with certain objects
})
});