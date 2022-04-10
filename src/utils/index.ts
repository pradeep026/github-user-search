// export date utils
export * from './DateUtils';

/**
 * Type gaurd function - Assert function to check the type of argument.
 * Throws `TypeError` if the argument is not a function
 *
 * @param fn - any type
 * @return boolean - true of type of `fn` is function else false
 */

export function assertIsFunction(fn: any): fn is Function {
    return fn && typeof fn === `function`;
};
