export default class TimeInterval {
    /** @type {number} */
    seconds;

    /**
     * @param {number} seconds
     */
    constructor(seconds) {
        this.seconds = seconds;
    }

    /**
     *
     * @param {number} n
     */
    static nanosec(n) {
        return new TimeInterval(n * 1e-9);
    }
}