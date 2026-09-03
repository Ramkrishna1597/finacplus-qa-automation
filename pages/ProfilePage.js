export class ProfilePage {
    constructor(page) {
        this.page = page;

        this.username = page.getByText(process.env.DEMOQA_USERNAME);
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
        this.bookStoreButton = page.getByRole('button', {
            name: 'Go To Book Store'
        });
    }

    async verifyLoggedIn() {
        await this.username.waitFor({ state: 'visible' });
        await this.logoutButton.waitFor({ state: 'visible' });
    }

    async goToBookStore() {
        await this.bookStoreButton.click();
    }

    async logout() {
        await this.logoutButton.click();
    }
}