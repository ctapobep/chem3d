export default class Vector {
    /** @type {number[]} */
    values;

    /**
     * @param {number} components
     */
    constructor(...components) {
        if(!Array.isArray(components))
            throw new Error("Not an array of numbers passed!");
        if(components.length < 1)
            throw new Error("Zero-dimensioned Vectors aren't supported");
        for (let i = 0; i < components.length; i++)
            if(!this.#isNumber(components[i]))
                throw new Error(`Component #${i} is not a number: ` + JSON.stringify(components));
        this.values = components;
    }

    /**
     * @param {Vector} that
     * @return {number}
     */
    dot(that) {
        this.#assertDimensionsEqual(that);
        let result = 0;
        for (let i = 0; i < this.values.length; i++)
            result += this.get(i) * that.get(i);
        return result;
    }

    /**
     * @param {number} scalar
     * @return {Vector}
     */
    scaled(scalar) {
        /** @type {number[]} */
        const result = [];
        for (let i = 0; i < this.values.length; i++)
            result[i] = this.values[i] * scalar;
        return new Vector(...result);
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
     * @return {Vector}
     */
    normalized() {
        const norm = this.norm();
        if(norm === 0)
            throw new Error("Can't normalize a zero vector: " + this);
        return this.scaled(1/norm);
    }

    /**
     * @param {number} componentIndex
     * @returns {number}
     */
    get(componentIndex) {
        return this.values[componentIndex];
    }
    toString() {
        return JSON.stringify(this.values);
    }

    /** @param {Vector} that */
    #assertDimensionsEqual(that) {
        if(this.dims() !== that.dims())
            throw new Error(`Can't dot vectors with different dimensions: ${this.dims()} & ${that.dims}`);
    }

    #isNumber(value) {
        return typeof value === "number" && !Number.isNaN(value);
    }
}