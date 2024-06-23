import * as three from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import {BufferGeometry, Line, LineBasicMaterial, Sphere, Vector3} from "three";
import Particle from "./physengine/Particle.js";
import TimeInterval from "./physengine/Time.js";
import Vector from "./la/Vector.js";
import {force} from "./physengine/ElectricField.js";

if (!WebGL.isWebGLAvailable()) {
    alert(WebGL.getWebGLErrorMessage());
    throw new Error();
}

const ww = window.innerWidth;
const wh = window.innerHeight;

const scene = new three.Scene();
const cam = new three.PerspectiveCamera(75, ww/ wh, .1, 1000);
cam.position.z = 20;
cam.position.x = 0;
const renderer = new three.WebGLRenderer();
renderer.setSize(ww, wh);
document.body.appendChild(renderer.domElement);

const eMesh = new three.Mesh(new three.CircleGeometry(.1), new three.MeshBasicMaterial({color: 0x1111ff}));
scene.add(eMesh);

const nMesh = new three.Mesh(new three.CircleGeometry(.1, 66), new three.MeshBasicMaterial({color: 0xff1111}));
scene.add(nMesh);

// scene.add(new Line(
//     new BufferGeometry().setFromPoints([new Vector3(0, 0, 0), new Vector3(10, 10, 1)]),
//     new LineBasicMaterial({color: 0x0000ff})
// ));
// scene.add(new Sphere(new Vector3(0, 0, 0), 5))
const ANGSTROM = 1e-10;
const PHYS_HEIGHT = ANGSTROM;
const M_IN_PIXEL = wh / PHYS_HEIGHT;
const PROTON_G = 1.67262192e-24;
const ELECTRON_G = 9.1093837e-28;
const nucleus = new Particle(new Vector(ANGSTROM/2,ANGSTROM/2,ANGSTROM/2), PROTON_G, 1);
const electron = new Particle(new Vector(ANGSTROM/3,0,ANGSTROM/2), ELECTRON_G, -1);
// electron.acceleration = new Vector(1e-2, .5, 0.2);
// electron.move(new TimeInterval(.5))

function animate() {
    requestAnimationFrame(animate);
    electron.applyForce(force(nucleus, electron), TimeInterval.nanosec(1));
    nMesh.position.x = toPixel(nucleus.pos.get(0));
    nMesh.position.y = toPixel(nucleus.pos.get(1));
    nMesh.position.z = toPixel(nucleus.pos.get(2));

    eMesh.position.x = toPixel(electron.pos.get(0));
    eMesh.position.y = toPixel(electron.pos.get(1));
    eMesh.position.z = toPixel(electron.pos.get(2));
    renderer.render(scene, cam);
}

/**
 *
 * @param {Vector} v
 * @return Vector3
 */
function to3Vector(v) {
    if(v.dims() !== 3)
        throw new Error("Must've been a 3D vector " + v);
    return new Vector3(v.get(0), v.get(1), v.get(2));
}
animate();

function toPixel(meters) {
    return meters / M_IN_PIXEL;
}