import { sum } from './testData';

describe('jest is working', () => {
	it('typescript testing is working', () => {
		expect(sum(1, 2)).toEqual(3);
	});
});
