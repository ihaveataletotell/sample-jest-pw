import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	moduleFileExtensions: ['js', 'ts'],
	transform: {
		'^.+\\.ts$': require.resolve('ts-jest'),
	},
	testEnvironment: 'jest-environment-jsdom-fifteen',
	testMatch: [
		'**/@tests_e2e_oop/*.(spec|test).ts',
	],
};

export default config;
