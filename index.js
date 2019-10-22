import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh
} from "./es_modules/three.js";

const { innerWidth, innerHeight } = window;
const scene = new Scene();
const camera = new PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
);
const renderer = new WebGLRenderer();

renderer.setSize(
    innerWidth,
    innerHeight
);

const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({ color: 0x00ff00 });
const cube = new Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.02;
}
animate();

document.body.appendChild(renderer.domElement);
renderer.domElement.addEventListener("touchmove", event => {
    event.preventDefault();
});
