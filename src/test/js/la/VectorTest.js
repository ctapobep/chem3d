import Vector from "../../../main/js/la/Vector.js";
import assert from "assert";

describe("Vector", () => {
    it("can dot", () => {
        assert.strictEqual(new Vector(1, 1, 1).dot(new Vector(0, 0, 0)), 0);
        assert.strictEqual(new Vector(1, 1, 1).dot(new Vector(2, 2, 2)), 6);
    })
    it("has length", () => {
        assert.strictEqual(new Vector(0, 0, 0).norm(), 0);
        assert.strictEqual(new Vector(1, 1, 1).norm(), Math.sqrt(3));
    })
})