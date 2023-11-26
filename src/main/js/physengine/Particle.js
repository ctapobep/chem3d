import Vector from "../la/Vector.js";

export default class Particle {
    /** @type {number} */
    #charge;
    /** @type {number} */
    #mass;
    /** @type {Vector} */
    #position;
    /** @type {Vector} */
    #velocity = Vector.ZERO3D;
    /** @type {Vector} */
    #acceleration = Vector.ZERO3D;

    constructor(position, mass, charge) {
        this.#charge = charge;
        this.#position = position;
        this.#mass = mass;
    }

    /** @param {Vector} a */
    set acceleration(a) {
        this.#acceleration = a;
    }

    /** @returns {Vector} */
    get position() {
        return this.#position;
    }

    /**
     *
     * @param {TimeInterval} timeInterval
     */
    move(timeInterval) {
        const sec = timeInterval.seconds;
        this.#position = this.#position
            .add(this.#velocity.scaled(sec))
            .add(this.#acceleration.scaled(sec*sec*.5));
        this.#velocity = this.#velocity.add(this.#acceleration.scaled(sec));
    }
}