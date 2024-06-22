export function accelerationCapped(fieldSource, particle) {

    // todo
    acceleration(fieldSource, particle)
}
/**
 * @param {Particle} fieldSource
 * @param {Particle} particle
 */
export function acceleration(fieldSource, particle) {
    return field(fieldSource, particle.pos).scaled(particle.charge);
}

/**
 * @param {Particle} fieldSource
 * @param {Vector} position
 * @return {Vector}
 */
export function field(fieldSource, position) {
    const distance = position.subtr(fieldSource.pos);
    let f = distance.normalized().scaled(fieldSource.charge / (2*Math.PI * distance.dot(distance)));
    if(f.norm() > 1e2)
        return f.scaled(1e2/f.norm());
    return f;
}