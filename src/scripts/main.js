import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
const webgl = document.querySelector("#webgl");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 7;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: webgl });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Create the Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // smooth movement
controls.dampingFactor = 0.05;

// Objects

// - Sphere
const material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide });
const cube = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), material);
cube.position.y = 1;

// --Surface
const surfaceMaterial = new THREE.MeshStandardMaterial({
  color: 0xffa500,
  opacity: 0.5,
  side: THREE.DoubleSide,
});
const surface = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  surfaceMaterial,
);
surface.rotation.x = -Math.PI * 0.25;
surface.rotation.z = Math.PI * 0.25;

surface.position.set(0, -0.5, -1);

scene.add(cube, surface);

// Lights

// -Ambiants
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);

// Resize
window.addEventListener("resize", () => {
  // Update sizes
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Update camera
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animate function

function animate() {
  requestAnimationFrame(animate);
  // Example animation

  renderer.render(scene, camera);
}

animate();
