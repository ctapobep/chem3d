import {strictEqual} from "assert";

/**
 * @param {number} f1
 * @param {number} f2
 * @param {number|null} precision a relative precision of 1 in 100 000 is used if nothing is passed
 */
export function assertFloatsEqual(f1, f2, precision = null) {
    let actualPrecision = precision;
    if(precision === null)
        actualPrecision = Math.max(Math.abs(f1), Math.abs(f2)) * 1e-5;
    if(Math.abs(f1 - f2) > actualPrecision)
        strictEqual(f1, f2);
}