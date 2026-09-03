export class BookStorePage {
    constructor(page) {
        this.page = page;

        this.searchInput = page.getByPlaceholder('Type to search');
        this.bookRows = page.locator('tbody tr');
        this.logoutButton = page.getByRole('button', { name: /Log out/i });
    }

    async searchBook(bookTitle) {
        await this.searchInput.fill(bookTitle);
    }

    getRowByTitle(bookTitle) {
        return this.bookRows.filter({
            hasText: bookTitle
        });
    }

    async extractBookDetails(row) {
        return {
            title: await row.locator('td').nth(1).innerText(),
            author: await row.locator('td').nth(2).innerText(),
            publisher: await row.locator('td').nth(3).innerText()
        };
    }

    async logout() {
        await this.logoutButton.click();
    }
}