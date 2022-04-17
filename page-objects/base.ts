import { Page } from "@playwright/test";

export class Base {
    readonly page: Page;

    private homeButtonSelector = '//ul[@class="navbar-nav mx-auto"]/li[1]'
    private reserveButtonSelector = '//ul[@class="navbar-nav mx-auto"]/li[2]'
    private signUpButtonSelector = '//ul[@class="navbar-nav mx-auto"]/li[3]'
    private logInButtonSelector = '//ul[@class="navbar-nav mx-auto"]/li[4]';

    constructor(page: Page) {
        this.page = page;
    }

    public async goToHomePage(): Promise<void> {
        await this.page.locator(this.homeButtonSelector).click();
    }

    public async goToReservePage(): Promise<void> {
        await this.page.locator(this.reserveButtonSelector).click();
    }

    public async goToSignUpPage(): Promise<void> {
        await this.page.locator(this.signUpButtonSelector).click();
    }

    public async goToLogInPageOrLogOut(): Promise<void> {
        await this.page.locator(this.logInButtonSelector).click();
    }
}