import * as three from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import {BufferGeometry, Line, LineBasicMaterial, Sphere, Vector3} from "three";

if (!WebGL.isWebGLAvailable()) {
    alert(WebGL.getWebGLErrorMessage());
    throw new Error();
}

const ww = window.innerWidth;
const wh = window.innerHeight;

const scene = new three.Scene();
const cam = new three.PerspectiveCamera(75, ww/ wh, .1, 1000);
const renderer = new three.WebGLRenderer();
renderer.setSize(ww, wh);
document.body.appendChild(renderer.domElement);

const cube = new three.Mesh(new three.BoxGeometry(1,1,1), new three.MeshBasicMaterial({color: 0x00ff00}));
scene.add(cube);
cam.position.z = 5;
cam.position.x = 2;

// scene.add(new Line(
//     new BufferGeometry().setFromPoints([new Vector3(0, 0, 0), new Vector3(10, 10, 1)]),
//     new LineBasicMaterial({color: 0x0000ff})
// ));
// scene.add(new Sphere(new Vector3(0, 0, 0), 5))

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += .01;
    cube.rotation.y += .01;
    renderer.render(scene, cam);
}
animate();
