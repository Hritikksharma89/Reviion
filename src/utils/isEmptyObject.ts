/**
 * Checks if the provided object is empty by comparing the number of keys
 * to 0.
 *
 * @param object - The object to check
 * @returns Whether the object is empty
 */
export const IsEmptyObject = (object: object): boolean => Object.keys(object).length !== 0;
