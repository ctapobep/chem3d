const VACUUM_PERMITTIVITY = 8.8541878188e-12;

export function accelerationCapped(fieldSource, particle) {

    // todo
    force(fieldSource, particle)
}
/**
 * @param {Particle} fieldSource
 * @param {Particle} particle
 * @return {Vector}
 */
export function force(fieldSource, particle) {
    return field(fieldSource, particle.pos).scaled(particle.charge);
}

/**
 * @param {Particle} fieldSource
 * @param {Vector} position
 * @return {Vector}
 */
export function field(fieldSource, position) {
    const distance = position.subtr(fieldSource.pos);
    let f = distance.normalized().scaled(fieldSource.charge / (VACUUM_PERMITTIVITY*2*Math.PI * distance.dot(distance)));
    if(f.norm() > 1e2)
        return f.scaled(1e2/f.norm());
    return f;
}