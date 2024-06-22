import * as three from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import {BufferGeometry, Line, LineBasicMaterial, Sphere, Vector3} from "three";
import Particle from "./physengine/Particle.js";
import TimeInterval from "./physengine/Time.js";
import Vector from "./la/Vector.js";
import {acceleration} from "./physengine/ElectricField.js";

if (!WebGL.isWebGLAvailable()) {
    alert(WebGL.getWebGLErrorMessage());
    throw new Error();
}

const ww = window.innerWidth;
const wh = window.innerHeight;

const scene = new three.Scene();
const cam = new three.PerspectiveCamera(75, ww/ wh, .1, 1000);
cam.position.z = 5;
cam.position.x = 2;
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

const nucleus = new Particle(new Vector(1.5,1.1,0), 1000, 1);
const electron = new Particle(new Vector(1,1,1), 1, -1);
electron.acceleration = new Vector(1e-2, .5, 0.2);
electron.move(new TimeInterval(.5))

function animate() {
    requestAnimationFrame(animate);
    electron.acceleration = acceleration(nucleus, electron);
    electron.move(new TimeInterval(.1));
    nMesh.position.x = nucleus.pos.get(0);
    nMesh.position.y = nucleus.pos.get(1);
    nMesh.position.z = nucleus.pos.get(2);

    eMesh.position.x = electron.pos.get(0);
    eMesh.position.y = electron.pos.get(1);
    eMesh.position.z = electron.pos.get(2);
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
