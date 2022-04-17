import { Locator, Page } from "@playwright/test";
import { LOGIN_URI, URL } from "../utils/constants";
import { Base } from "./base";

export class LogInPage extends Base {
    readonly page: Page;

    private eMailInputLocator = 'xpath=//input[@type="email"]';
    private passwordInputLocator = 'xpath=//input[@type="password"]';
    private submitLoginButtonLocator = 'xpath=//button[@type="submit"]';

    private emailErrorMessageSelector = '#email-message';
    private passwordErrorMessageSelector = '#password-message';

    constructor(page: Page) {
        super(page);

        this.page = page;
    }

    public getEmailErrorMessage(): Locator {
        return this.page.locator(this.emailErrorMessageSelector);
    }

    public getPasswordErrorMessage(): Locator {
        return this.page.locator(this.passwordErrorMessageSelector);
    }

    public async goTo(locale: string): Promise<void> {
        await this.page.goto(URL + locale + LOGIN_URI);
    }

    public async logIn(eMail:string, password:string): Promise<void> {
        await this.page.locator(this.eMailInputLocator).fill(eMail);
        await this.page.locator(this.passwordInputLocator).fill(password);
        await this.page.locator(this.submitLoginButtonLocator).click();
    }
}