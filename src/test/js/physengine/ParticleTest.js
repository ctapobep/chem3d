import Particle from "../../../main/js/physengine/Particle.js";
import Vector from "../../../main/js/la/Vector.js";
import TimeInterval from "../../../main/js/physengine/Time.js";
import assert from "assert";
import {assertFloatsEqual} from "../AssertUtils.js";
import {randomInt} from "../RandomUtils.js";

describe("Particle", () => {
    it("does not move if its velocity & acceleration are 0", () => {
        const originalPosition = new Vector(0, 1, 0);
        const p = new Particle(originalPosition, 1, 1);
        p.move(new TimeInterval(100));
        assert.deepStrictEqual(p.pos, originalPosition);
    });
    it("moves if velocity changes due to acceleration", () => {
        const originalPosition = new Vector(0, 1, 0);
        const p = new Particle(originalPosition, 1, 1);
        p.acceleration = new Vector(1, 2, -3);
        p.move(new TimeInterval(2));
        assert.deepStrictEqual(p.pos, originalPosition.add(new Vector(1, 2, -3).scaled(2)));
    });
    it("moves keeps moving if acceleration dropped to 0", () => {
        const originalPosition = new Vector(0, 1, 0);
        const p = new Particle(originalPosition, 1, 1);
        const a = new Vector(1, 2, -3);
        p.acceleration = a;
        p.move(new TimeInterval(1));
        p.acceleration = Vector.ZERO3D;
        p.move(new TimeInterval(1));
        assert.deepStrictEqual(
            p.pos,
            originalPosition.add(a.scaled(.5)).add(a/*by the 2nd move() it's actually v, not a*/));
    });
    describe("field", () => {
        it("magnitude is a multiple of the particle charge", () => {
            const particleLoc = new Vector(-1, 0, 2);
            const p1 = new Particle(particleLoc, 0, 1);
            const fieldLoc = new Vector(3, -2, 5);
            // distance: [3+1 -2 5-2]=[4 -2 3]
            // magnitude: 1/(2π [4 -2 3]^2) = 0.0109762
            assertFloatsEqual(p1.getField(fieldLoc).norm(), 0.005488101);

            const charge = randomInt(10)
            const p2 = new Particle(particleLoc, 0, charge);
            assertFloatsEqual(p2.getField(fieldLoc).norm(), 0.005488101 * charge);
        });
        it("points away from a positive particle", () => {
            const field = new Particle(new Vector(0,0,0), 0, 1).getField(new Vector(1,0,0));
            assert.deepStrictEqual(field.normalized(), new Vector(1, 0, 0).normalized());
        });
        it("points towards a negative particle", () => {
            const field = new Particle(new Vector(0,0,0), 0, -1).getField(new Vector(1,0,0));
            assert.deepStrictEqual(field.normalized(), new Vector(-1, 0, 0).normalized());
        });
    })
});