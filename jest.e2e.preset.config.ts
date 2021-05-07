import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	moduleFileExtensions: ['js', 'ts'],
	transform: {
		'^.+\\.ts$': require.resolve('ts-jest'),
	},
	testMatch: [
		'**/@tests_e2e_preset/*.(spec|test).ts',
	],
	// https://github.com/playwright-community/jest-playwright
	preset: 'jest-playwright-preset',
	testEnvironmentOptions: {
		'jest-playwright': {
			browsers: ['chromium', 'firefox'],
			launchOptions: {
				headless: true,
			},
		},
	}
};

export default config;
