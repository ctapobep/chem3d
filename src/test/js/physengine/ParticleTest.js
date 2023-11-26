import Particle from "../../../main/js/physengine/Particle.js";
import Vector from "../../../main/js/la/Vector.js";
import TimeInterval from "../../../main/js/physengine/Time.js";
import assert from "assert";

describe("Particle", ()=> {
    it("does not move if its velocity & acceleration are 0", ()=> {
        const originalPosition = new Vector(0, 1, 0);
        const p = new Particle(originalPosition, 1, 1);
        p.move(new TimeInterval(100));
        assert.deepStrictEqual(p.position, originalPosition);
    });
    it("moves if velocity changes due to acceleration", ()=> {
        const originalPosition = new Vector(0, 1, 0);
        const p = new Particle(originalPosition, 1, 1);
        p.acceleration = new Vector(1, 2, -3);
        p.move(new TimeInterval(2));
        assert.deepStrictEqual(p.position, originalPosition.add(new Vector(1, 2, -3).scaled(2)));
    });
    it("moves keeps moving if acceleration dropped to 0", ()=> {
        const originalPosition = new Vector(0, 1, 0);
        const p = new Particle(originalPosition, 1, 1);
        const a = new Vector(1, 2, -3);
        p.acceleration = a;
        p.move(new TimeInterval(1));
        p.acceleration = Vector.ZERO3D;
        p.move(new TimeInterval(1));
        assert.deepStrictEqual(
            p.position,
            originalPosition.add(a.scaled(.5)).add(a/*by the 2nd move() it's actually v, not a*/));
    });
});