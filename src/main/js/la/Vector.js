export default class Vector {
    /** @type {number[]} */
    values;

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(x, y, z) {
        this.values = [x, y, z];
    }

    /**
     * @param {Vector} that
     * @return {number}
     */
    dot(that) {
        if(this.dims() !== that.dims())
            throw new Error(`Can't dot vectors with different dimensions: ${this.dims()} & ${that.dims}`)
        let result = 0;
        for (let i = 0; i < this.values.length; i++)
            result += this.get(i) * that.get(i);
        return result;
    }

    /** @returns {number} */
    dims() {
        return this.values.length;
    }

    /** @returns {number} */
    norm() {
        return Math.sqrt(this.dot(this));
    }

    /**
     * @param {number} componentIndex
     * @returns {number}
     */
    get(componentIndex) {
        return this.values[componentIndex];
    }
}