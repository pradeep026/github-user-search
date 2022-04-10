import { assertIsFunction, DateUtils } from '../index';

it(`assertIsFunction asserts any value type is function`, () => {
    // Assert non-function types
    expect(assertIsFunction(null)).toBeFalsy();
    expect(assertIsFunction(undefined)).toBeFalsy();
    expect(assertIsFunction(`test`)).toBeFalsy();
    expect(assertIsFunction(1123)).toBeFalsy();
    expect(assertIsFunction(false)).toBeFalsy();
    expect(assertIsFunction(true)).toBeFalsy();
    expect(assertIsFunction([1,2,3,4])).toBeFalsy();
    expect(assertIsFunction({})).toBeFalsy();

    // Assert function type
    expect(assertIsFunction(() => {})).toBeTruthy();
    expect(assertIsFunction(async () => {})).toBeTruthy();
});

it(`Assert DateUtils`, () => {

    expect(DateUtils.format(new Date(`10/04/2022`))).toContain(`Oct 4, 2022`);

    expect(DateUtils.format(new Date(`2014-05-27T06:06:50Z`))).toContain(`May 27, 2014`);

    try {
        DateUtils.format(new Date(``));
    } catch (error) {
        expect((error as unknown as Error).message).toBe(`Invalid Date`)
    }
    try {
        DateUtils.format(new Date(`null`));
    } catch (error) {
        expect((error as unknown as Error).message).toBe(`Invalid Date`)
    }
});