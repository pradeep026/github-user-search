/**
 * Date Format Utils
 */

export const DateUtils = {
    get formatter() {
        // TODO: Replace US with locale value
        return new Intl.DateTimeFormat(`en-US`, { dateStyle: 'medium', timeStyle: 'medium' });
    },
    format(date?: number | Date | undefined) {
        if(!date || Number.isNaN(Date.parse(`${date}`))) {
            throw new RangeError(`${date}`);
        }
        return this.formatter?.format(date);
    },
} as const;
