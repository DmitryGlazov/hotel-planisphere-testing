import { test, expect} from '@playwright/test';
import { LogInPage } from '../../page-objects/log-in';
import { UserPage } from '../../page-objects/user-page';
import { JP_USERS } from '../../test-data/existing-users/jp-users';
import { US_USERS } from '../../test-data/existing-users/us-users';
import { LOCALE_JP, URL } from '../../utils/constants';

const EMPTY_FIELD_ERROR_TEXT = 'このフィールドを入力してください。';
const INVALID_EMAIL_ERROR_TEXT = 'メールアドレスを入力してください。';
const INVALID_EMAIL_OR_PASSWORD_ERROR_TEXT = 'メールアドレスまたはパスワードが違います。';

test.beforeEach(async ({ page }) => {
  await page.goto(URL + LOCALE_JP);
});

test.describe('Log In tests', () => {
    test('Should be able to log in with already registered user', async ({ page }) => {
      const user = JP_USERS[0];
      const logInPage = new LogInPage(page);

      await logInPage.goTo(LOCALE_JP);
      await logInPage.logIn(user.email, user.password);

      const userPage = new UserPage(page);
      await expect(userPage.getEmail()).toHaveText(user.email);
    });

    test('Should not be able to log in with not registered user', async ({ page }) => {
      const logInPage = new LogInPage(page);

      await logInPage.goTo(LOCALE_JP);
      await logInPage.logIn('ichiro3@example.com', 'password222');

      await expect(logInPage.getEmailErrorMessage()).toHaveText(INVALID_EMAIL_OR_PASSWORD_ERROR_TEXT);
      await expect(logInPage.getPasswordErrorMessage()).toHaveText(INVALID_EMAIL_OR_PASSWORD_ERROR_TEXT)
    });

    test('Should not be able to log in with user registered at another locale', async ({ page }) => {
      const user = US_USERS[0];
      const logInPage = new LogInPage(page);

      await logInPage.goTo(LOCALE_JP);
      await logInPage.logIn(user.email, user.password);

      await expect(logInPage.getEmailErrorMessage()).toHaveText(INVALID_EMAIL_OR_PASSWORD_ERROR_TEXT);
      await expect(logInPage.getPasswordErrorMessage()).toHaveText(INVALID_EMAIL_OR_PASSWORD_ERROR_TEXT)
    });

    test('Should not be able to log in with empty inputs', async ({ page }) => {
      const logInPage = new LogInPage(page);

      await logInPage.goTo(LOCALE_JP);
      await logInPage.logIn('', '');

      await expect(logInPage.getEmailErrorMessage()).toHaveText(EMPTY_FIELD_ERROR_TEXT);
      await expect(logInPage.getPasswordErrorMessage()).toHaveText(EMPTY_FIELD_ERROR_TEXT);
    });

    test('Should not be able to log in with invalid email', async ({ page }) => {
      const logInPage = new LogInPage(page);

      await logInPage.goTo(LOCALE_JP);
      await logInPage.logIn('invalid_email', '');

      await expect(logInPage.getEmailErrorMessage()).toHaveText(INVALID_EMAIL_ERROR_TEXT);
    });
})