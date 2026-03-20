import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

// Canvas
const webgl = document.querySelector("#webgl");

// Scene
const scene = new THREE.Scene();

// Fog
const fog = new THREE.Fog("#262837", 1, 15);
scene.fog = fog;

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 7;

// const textLoader
//
const textLoader = new THREE.TextureLoader();

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: webgl });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");
document.body.appendChild(renderer.domElement);

// Create the Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // smooth movement
controls.dampingFactor = 0.05;

// Objects
// House
const house = new THREE.Group();
scene.add(house);

// - Sphere
const material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide });
const cube = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), material);
cube.position.y = 1;
// scene.add(cube);

// --Surface
const surfaceMaterial = new THREE.MeshStandardMaterial({
  color: "#a9c388",
  opacity: 0.5,
  side: THREE.DoubleSide,
});
const surface = new THREE.Mesh(
  new THREE.PlaneGeometry(22, 22),
  surfaceMaterial,
);
surface.rotation.x = -Math.PI * 0.5;

surface.position.set(0, 0, -1);

scene.add(surface);

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({ color: "#ac8e82" }),
);
walls.position.y = 2.5 / 2;
house.add(walls);

// Roofs
const roofs = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" }),
);

roofs.position.y = 3;
roofs.rotation.y = Math.PI * 0.25;
house.add(roofs);

// Doors
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.75),
  new THREE.MeshStandardMaterial({ color: "#aa7b7b" }),
);
door.position.set(0, 0.88, 2.01);
house.add(door);

// Bushes
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });
const bush1 = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), bushMaterial);
const bush2 = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), bushMaterial);
const bush3 = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), bushMaterial);
const bush4 = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), bushMaterial);

bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 6;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(x, 0.3, z);
  grave.rotation.y = (Math.random() - 0.5) * 1;
  grave.rotation.z = (Math.random() - 0.5) * 1;
  graves.add(grave);
}

// Lights

// -Ambiants
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
scene.add(ambientLight);

// Directional Light
const directionalLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
directionalLight.position.set(4, 5, -2);
scene.add(directionalLight);

// Door lights
const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
doorLight.position.set(0, 2.2, 2.7);
scene.add(doorLight);

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
