describe('e2e как оно есть', () => {
	test('базовое использование в конфиге pw', () => {
		expect(1 + 2).toBe(3);
	});

	it('магические глобальные переменные', () => {
		expect(3 + 3).toBe(6);
		expect(browser).toBeDefined();
		expect(page).toBeDefined();
	});

	it('работает pw, да еще и с jest. Вот это да!', async () => {
		await page.goto('https://habr.com/');
		const title = await page.title();

		expect(/(Habr|Хабр)/.test(title)).toBeTruthy();
	});
});
