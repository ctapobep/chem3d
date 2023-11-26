import Vector from "../../../main/js/la/Vector.js";
import assert from "assert";

describe("Vector", () => {
    it("can dot", () => {
        assert.strictEqual(new Vector(1, 1, 1).dot(new Vector(0, 0, 0)), 0);
        assert.strictEqual(new Vector(1, 1, 1).dot(new Vector(2, 2, 2)), 6);
    });
    it("has length", () => {
        assert.strictEqual(new Vector(0, 0, 0).norm(), 0);
        assert.strictEqual(new Vector(1, 1, 1).norm(), Math.sqrt(3));
    });
    it("can return normalized version of itself with length=1", ()=> {
        assert.deepStrictEqual(new Vector(1, 0, 0).normalized(), new Vector(1, 0, 0));
        assert.deepEqual(new Vector(1, 0, 1).normalized(), new Vector(1/Math.sqrt(2), 0, 1/Math.sqrt(2)));
    });
    it("errs if normalization is invoked for a zero vector", ()=> {
        assert.throws(() => new Vector(0).normalized());
    });
})