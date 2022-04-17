import { Page } from "@playwright/test";
import { Base } from "./base";

export class SignUpPage extends Base {
    readonly page: Page;

    private eMailInputLocator = '#email';
    private passwordInputLocator = '#password';
    private confirmPasswordInputLocator = '#password-confirmation';
    private userNameInputLocator = '#username';
    private premiumMembershipRButtonLocator = '#rank-premium';
    private normalMembershipRButtonLocator = '#rank-normal';
    private addressInputLocator = '#address';
    private phoneNumberInputLocator = '#tel';
    private genderSelectorLocator = 'select#gender';
    private dateInputLocator = '#birthday';
    private notificationCheckboxLocator = '#notification';

    private submitButtonSelector = 'xpath=//button[@type="submit"]';

    constructor(page: Page) {
        super(page);

        this.page = page;
    }

    public async signUp(signUpData: Person): Promise<void> {
        await this.page.locator(this.eMailInputLocator).fill(signUpData.email);
        await this.page.locator(this.passwordInputLocator).fill(signUpData.password);
        await this.page.locator(this.confirmPasswordInputLocator).fill(signUpData.password);
        await this.page.locator(this.userNameInputLocator).fill(signUpData.name);

        if (!signUpData.premiumMembership) {
            await this.page.locator(this.normalMembershipRButtonLocator).check();
        }

        if (signUpData.address) {
            await this.page.locator(this.addressInputLocator).fill(signUpData.address);
        }

        if (signUpData.phoneNumber) {
            await this.page.locator(this.phoneNumberInputLocator).fill(signUpData.phoneNumber);
        }

        await this.chooseGender(signUpData.gender);

        if (signUpData.dateOfBirth) {
            await this.page.locator(this.dateInputLocator).fill(signUpData.dateOfBirth);
        }

        if (signUpData.recieveNotification) {
            await this.page.locator(this.notificationCheckboxLocator).check();
        }

        await this.page.locator(this.submitButtonSelector).click();
    }

    private async chooseGender(gender: Gender): Promise<void> {
        switch (gender) {
            case Gender.NOT_SPECIFIED:
                await this.page.locator(this.genderSelectorLocator).selectOption({ label: '回答しない' });
                break;
            
            case Gender.MALE:
                await this.page.locator(this.genderSelectorLocator).selectOption({ label: '男性' });
                break;
            
            case Gender.FEMALE:
                await this.page.locator(this.genderSelectorLocator).selectOption({ label: '女性' });
                break;

            case Gender.OTHER:
                await this.page.locator(this.genderSelectorLocator).selectOption({ label: 'その他' });
                break; 

            default:
                throw new Error('Unknown gender value!');
        }
    }
}