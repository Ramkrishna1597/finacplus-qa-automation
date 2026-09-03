import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';
import { BookStorePage } from '../pages/BookStorePage.js';
import { writeToFile } from '../utils/fileUtils.js';

const USERNAME = process.env.DEMOQA_USERNAME;
const PASSWORD = process.env.DEMOQA_PASSWORD;
const BOOK_TITLE = 'Learning JavaScript Design Patterns';

test.describe('DemoQA Book Store - end to end flow', () => {


  test('login, validate profile, search a book, capture details, logout', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);
    const bookStorePage = new BookStorePage(page);

    await test.step('Login with the manually created user', async () => {
      await loginPage.navigate();
      await loginPage.login(USERNAME, PASSWORD);

      await expect(page).toHaveURL('https://demoqa.com/profile');
    });

    await test.step('Validate username and logout button on profile page', async () => {
      await expect(profilePage.username).toBeVisible();
      await expect(profilePage.logoutButton).toBeVisible();
    });

    await test.step('Navigate to Book Store application', async () => {
      await profilePage.goToBookStore();

      await expect(page).toHaveURL('https://demoqa.com/books');
    });

    await test.step(`Search for "${BOOK_TITLE}"`, async () => {
      await bookStorePage.searchBook(BOOK_TITLE);
    });

    await test.step('Validate search result and capture book details', async () => {
      const row = bookStorePage.getRowByTitle(BOOK_TITLE);

      await expect(row).toBeVisible();
      await expect(row).toContainText(BOOK_TITLE);

      const details = await bookStorePage.extractBookDetails(row);

      expect(details.title).toContain(BOOK_TITLE);
      expect(details.author).not.toBe('');
      expect(details.publisher).not.toBe('');

      const bookDetails = `Title: ${details.title}
      Author: ${details.author}
      Publisher: ${details.publisher}`;

      writeToFile('book-details.txt', bookDetails);
    });

    await test.step('Logout', async () => {
      await expect(bookStorePage.logoutButton).toBeVisible();

      await bookStorePage.logout();

      await expect(page).toHaveURL(/\/login/);
    });

  });
});