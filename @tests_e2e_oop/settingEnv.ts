import * as pw from 'playwright';
import type { Browser, Page } from 'playwright';

type BrowserType = 'chromium' | 'firefox';

interface SetupConfigI {
	browsers: BrowserType[];
	doClosePageAfterEach?: boolean;
	doOpenPageBeforeEach?: boolean;
	isBrowsersVisible?: boolean;
	onAfterAll?(): Promise<void> | void;
	onAfterEach?(): Promise<void> | void;
	onBeforeAll?(): Promise<void> | void;
	onBeforeEach?(): Promise<void> | void;
}

export class EnvWizard {
	public static doSetupEnvVar(config: SetupConfigI): EnvVar {
		const envVar = new EnvVar(config);

		beforeAll(async () => {
			await envVar.init();
			await config.onBeforeAll?.();
		});

		beforeEach(async () => {
			await config.onBeforeEach?.();
		});

		afterEach(async () => {
			await config.onAfterEach?.();
		});

		afterAll(async () => {
			await envVar.destroy();
			await config.onAfterAll?.();
		});

		return envVar;
	}
}

export class EnvVar {
	private _webPage: Page | undefined;
	public defaultBrowser!: Readonly<Browser>;
	private readonly _launchedBrowsers: Browser[];
	private readonly _config: SetupConfigI;

	public constructor(config: SetupConfigI) {
		this._launchedBrowsers = [];
		this._config = config;
	}

	public set webPage(value: Page) {
		if (this.webPage && !this.webPage.isClosed()) throw new Error('EnvVar: webPage не был закрыт перед переопределением');
		this._webPage = value;
	}

	public get webPage(): Page {
		return this._webPage!;
	}

	public get launchedBrowsers(): Readonly<Browser[]> {
		return this._launchedBrowsers;
	}

	public forEachBrowser(fn: (browser: Browser, webPage: Page) => Promise<void> | void): () => Promise<void> {
		return async (): Promise<void> => {
			for (const browser of this.launchedBrowsers) {
				if (this._config.doOpenPageBeforeEach) {
					this.webPage = await this.defaultBrowser.newPage();
				}

				await fn(browser, this.webPage);

				if (this._config.doClosePageAfterEach) {
					if (!this.webPage) throw new Error('currentWebPage был стерт во время теста');
					await this.webPage.close();
				}
			}
		};
	}

	public async init(): Promise<void> {
		for (const browserType of this._config.browsers) {
			const browser = await pw[browserType].launch({ headless: !this._config.isBrowsersVisible });
			this._launchedBrowsers.push(browser);
		}

		this.defaultBrowser = this.launchedBrowsers[0];
		if (!this.defaultBrowser) throw new Error('EnvVar: нужно определить хотя бы один браузер');
	}

	public async destroy(): Promise<void> {
		for (const browser of this.launchedBrowsers) {
			await browser.close();
		}
	}
}
