import {force} from "./ElectricField.js";
import Vector from "../la/Vector.js";

export class ParticleSystem {
    /** @type {Particle[]} */
    #particles = [];

    /**
     * @param {Particle} particle
     */
    addParticle(particle) {
       this.#particles.push(particle);
    }

    /**
     * @param {TimeInterval} timeInterval
     */
    tick(timeInterval) {
        /** @type {Vector[]} */
        const forces = [];
        for (let i = 0; i < this.#particles.length; i++){
            const currParticle = this.#particles[i];
            let forceActingOnCurrParticle = Vector.ZERO3D;
            for (let j = 0; j < this.#particles.length; j++) {
                if(j === i)
                    continue;
                forceActingOnCurrParticle = forceActingOnCurrParticle.add(force(this.#particles[j], currParticle));
            }
            forces[i] = forceActingOnCurrParticle;
        }
        for (let i = 0; i < this.#particles.length; i++)
            this.#particles[i].applyForce(forces[i], timeInterval);
    }
}