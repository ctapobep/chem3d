export default class Vector {
    static ZERO3D = new Vector(0, 0, 0);
    /** @type {number[]} */
    values;

    /**
     * @param {...number} components
     */
    constructor(...components) {
        this.#validate(components);
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
        this.#cleanUp(result);
        return new Vector(...result);
    }

    /**
     * @param {Vector} that
     * @return {Vector}
     */
    add(that) {
        const result = [];
        for (let i = 0; i < this.values.length; i++)
            result.push(this.get(i) + that.get(i));
        this.#cleanUp(result);
        return new Vector(...result);
    }

    /**
     * @param {Vector} that
     * @return {Vector}
     */
    subtr(that) {
        return this.add(that.scaled(-1));
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
        if (norm === 0)
            throw new Error("Can't normalize a zero vector: " + this);
        return this.scaled(1 / norm);
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
        if (this.dims() !== that.dims())
            throw new Error(`Can't dot vectors with different dimensions: ${this.dims()} & ${that.dims}`);
    }

    #isNumber(value) {
        return typeof value === "number" && !Number.isNaN(value);
    }

    /**
     * @param {number[]} components
     */
    #cleanUp(components) {
        for (let i = 0; i < components.length; i++) {
            const val = components[i];
            if(val === -0)
                components[i] = 0;
        }
    }
    /**
     * @param {number[]} components
     */
    #validate(components) {
        if (!Array.isArray(components))
            throw new Error("Not an array of numbers passed!");
        if (components.length < 1)
            throw new Error("Zero-dimensioned Vectors aren't supported");
        for (let i = 0; i < components.length; i++)
            if (!this.#isNumber(components[i]))
                throw new Error(`Component #${i} is not a number: ` + JSON.stringify(components));
    }
}