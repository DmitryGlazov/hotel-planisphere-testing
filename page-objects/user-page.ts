import { Locator, Page } from "@playwright/test";
import { Base } from "./base";

export class UserPage extends Base {
    readonly page: Page;

    private userEmailLocator = 'xpath=//p[@id="email"]';

    constructor(page: Page) {
        super(page);

        this.page = page;
    }

    public getEmail(): Locator {
        return this.page.locator(this.userEmailLocator);
    }
}