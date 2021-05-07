export const sum = <T extends number>(a: T, b: T): T => {
	return a + b as T;
};
