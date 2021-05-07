import type { Page } from 'playwright';
import { EnvWizard } from './settingEnv';

const envVar = EnvWizard.doSetupEnvVar({
	browsers: ['firefox', 'chromium'],
	doOpenPageBeforeEach: true,
	doClosePageAfterEach: true,
	isBrowsersVisible: false,
});

describe('e2e как оно есть', () => {
	test('базовое использование в конфиге pw', () => {
		expect(1 + 2).toBe(3);
		expect(envVar.defaultBrowser).toBeDefined();
	});

	let memoPage: Page;

	it('базовое использование внутри оберточки', envVar.forEachBrowser(() => {
		const { webPage, defaultBrowser } = envVar;

		expect(memoPage).not.toBe(webPage);
		memoPage = webPage;

		expect(3 + 3).toBe(6);
		expect(webPage).toBeDefined();
		expect(defaultBrowser).toBeDefined();
	}));

	it('работает pw, да еще и с jest, да еще и своими руками. Вот это да!', envVar.forEachBrowser(async () => {
		const { webPage } = envVar;

		await webPage.goto('https://www.google.ru/');
		expect(await webPage.title()).toContain('Google');
	}));
});
