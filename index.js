import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshLambertMaterial,
    DirectionalLight,
    AmbientLight,
    Mesh,
    VertexColors
} from "https://unpkg.com/three@0.109.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.109.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.109.0/examples/jsm/controls/OrbitControls.js";

const { innerWidth, innerHeight } = window;
const scene = new Scene();
const camera = new PerspectiveCamera(
    45,
    innerWidth / innerHeight,
    0.1,
    1000
);
const renderer = new WebGLRenderer({
    antialias: true
});

renderer.setSize(
    innerWidth,
    innerHeight
);

const loader = new GLTFLoader();
loader.load("3dExports/corridor_test.gltf", gltf => {
    gltf.scene.scale.set(0.1, 0.1, 0.1);
    
    gltf.scene.traverse(object3d => {
        const { material } = object3d;

        if (object3d.isMesh && material) {
            object3d.material = new MeshLambertMaterial({
                vertexColors: VertexColors
            });
            material.dispose();
        }
    });
    
    scene.add(gltf.scene);
    
    const directionalLight = new DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    new OrbitControls(camera, renderer.domElement);

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
});

const CAMERA_POSITION = 5;
camera.position.x = CAMERA_POSITION;
camera.position.y = CAMERA_POSITION;
camera.position.z = CAMERA_POSITION;

document.body.appendChild(renderer.domElement);
renderer.domElement.addEventListener("touchmove", event => {
    event.preventDefault();
});
