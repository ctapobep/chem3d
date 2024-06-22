import Vector from "../../../main/js/la/Vector.js";
import Particle from "../../../main/js/physengine/Particle.js";
import {assertFloatsEqual} from "../AssertUtils.js";
import {randomInt} from "../RandomUtils.js";
import assert from "assert";
import {field} from "../../../main/js/physengine/ElectricField.js";

describe("electric field", () => {
    it("magnitude is a multiple of the particle charge", () => {
        const particleLoc = new Vector(-1, 0, 2);
        const p1 = new Particle(particleLoc, 0, 1);
        const fieldLoc = new Vector(3, -2, 5);
        // distance: [3+1 -2 5-2]=[4 -2 3]
        // magnitude: 1/(2π [4 -2 3]^2) = 0.0109762
        assertFloatsEqual(field(p1, fieldLoc).norm(), 0.005488101);

        const charge = randomInt(10)
        const p2 = new Particle(particleLoc, 0, charge);
        assertFloatsEqual(field(p2, fieldLoc).norm(), 0.005488101 * charge);
    });
    it("points away from a positive particle", () => {
        const f = field(new Particle(new Vector(0,0,0), 0, 1), new Vector(1,0,0));
        assert.deepStrictEqual(f.normalized(), new Vector(1, 0, 0).normalized());
    });
    it("points towards a negative particle", () => {
        const f = field(new Particle(new Vector(0,0,0), 0, -1), new Vector(1,0,0));
        assert.deepStrictEqual(f.normalized(), new Vector(-1, 0, 0).normalized());
    });
})