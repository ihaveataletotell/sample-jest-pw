import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	moduleFileExtensions: ['js', 'ts'],
	transform: {
		'^.+\\.ts$': require.resolve('ts-jest'),
		'.+\\.(css|sass|svg|png|woff2)$': require.resolve('jest-transform-stub'),
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1'
	},
	testEnvironment: 'jest-environment-jsdom-fifteen',
	testMatch: [
		'**/@tests/*.(spec|test).ts',
	],
};

export default config;
