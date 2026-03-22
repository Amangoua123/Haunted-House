import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { time } from "three/tsl";

// Canvas
const webgl = document.querySelector("#webgl");

// Scene
const scene = new THREE.Scene();

// Fog
// const fog = new THREE.Fog("#262837", 1, 15);
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

const doorColortexture = textLoader.load("textures/door/color.jpg");
const doorNormaltexture = textLoader.load("textures/door/normal.jpg");
const doorAlphatexture = textLoader.load("textures/door/alpha.jpg");
const doorAmbientOcclusiontexture = textLoader.load(
  "textures/door/ambientOcclusion.jpg",
);
const doorHeightNormalexture = textLoader.load("textures/door/height.jpg");
const doorMetalnesstexture = textLoader.load("textures/door/metalness.jpg");
const doorRoughnesstexture = textLoader.load("textures/door/roughness.jpg");

// Bricks texture

const bricksColorTexture = textLoader.load("textures/bricks/color.jpg");
const bricksAmbientOcclusionTexture = textLoader.load(
  "textures/bricks/ambientOcclusion.jpg",
);
const bricksNormalTexture = textLoader.load("textures/bricks/normal.jpg");
const bricksRoughtNessTexture = textLoader.load(
  "textures/bricks/roughness.jpg",
);

// Grass Texture
const grassColorTexture = textLoader.load("textures/grass/color.jpg");
const grassAmbientOcclusionTexture = textLoader.load(
  "textures/grass/ambientOcclusion.jpg",
);
const grassNormalTexture = textLoader.load("textures/grass/normal.jpg");
const grassRoughtNessTexture = textLoader.load("textures/grass/roughness.jpg");

grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughtNessTexture.repeat.set(8, 8);

grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassColorTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughtNessTexture.wrapS = THREE.RepeatWrapping;

grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassColorTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughtNessTexture.wrapT = THREE.RepeatWrapping;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: webgl });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");
document.body.appendChild(renderer.domElement);

// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

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

// --Floor
const surfaceMaterial = new THREE.MeshStandardMaterial({
  // side: THREE.DoubleSide,
  map: grassColorTexture,
  aoMap: grassAmbientOcclusionTexture,
  normalMap: grassNormalTexture,
  roughnessMap: grassRoughtNessTexture,
});

const surface = new THREE.Mesh(
  new THREE.PlaneGeometry(22, 22),
  surfaceMaterial,
);
surface.rotation.x = -Math.PI * 0.5;

surface.position.set(0, 0, -1);

scene.add(surface);

surface.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(surface.geometry.attributes.uv.array, 2),
);

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughness: bricksRoughtNessTexture,
  }),
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
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColortexture,
    alphaMap: doorAlphatexture,
    transparent: true,
    aoMap: doorAmbientOcclusiontexture,
    displacementMap: doorHeightNormalexture,
    displacementScale: 0.1,
    normalMap: doorNormaltexture,
    metalnessMap: doorMetalnesstexture,
    roughnessMap: doorRoughnesstexture,
  }),
);
door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2),
);

walls.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2),
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

// Idea: Ghost slows down near graves

graves.children.forEach((grave) => {
  const dx = ghost1.position.x - grave.position.x;
  const dz = ghost1.position.z - grave.position.z;
  const distance = Math.sqrt(dx * dx + dz * dz);

  if (distance < 1.5) {
    ghost1.intensity = 4; // glow stronger near graves
  }
});

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 6 + Math.sin(angle * 3) * 0.5;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(x, 0.3, z);
  grave.rotation.y = (Math.random() - 0.5) * 1;
  grave.rotation.z = (Math.random() - 0.5) * 1;
  grave.castShadow = true;
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

// Ghost light
const ghost1 = new THREE.PointLight("#ff00ff", 2, 3);
scene.add(ghost1);

const ghost2 = new THREE.PointLight("#00ffff", 2, 3);
scene.add(ghost2);

const ghost3 = new THREE.PointLight("#ffff00", 2, 3);
scene.add(ghost3);

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

const timer = new THREE.Timer();

// Animate function
function animate() {
  timer.update();
  const elapsed = timer.getElapsed();

  const radius = 4;
  let ghost1Angle = elapsed * 0.5;
  let ghost2Angle = -elapsed * 0.32;
  let ghost3Angle = -elapsed * 0.18;

  ghost1.position.x = Math.cos(ghost1Angle) * radius;
  ghost1.position.y = Math.sin(ghost1Angle) * 3;
  ghost1.position.z = Math.sin(ghost1Angle) * radius;

  ghost2.position.x = Math.cos(ghost2Angle) * radius;
  ghost2.position.y = Math.sin(ghost2Angle) * 4 + Math.sin(elapsed * 2.5);
  ghost2.position.z = Math.sin(ghost2Angle) * radius;

  ghost1.position.x = Math.cos(ghost3Angle) * (7 + Math.cos(elapsed * 0.32));
  ghost1.position.y = Math.sin(ghost3Angle) * (7 + Math.cos(elapsed * 0.5));
  ghost1.position.z = Math.sin(ghost3Angle * radius) + Math.sin(elapsed * 2);

  requestAnimationFrame(animate);
  // Example animation

  renderer.render(scene, camera);
}

animate();

//
directionalLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

surface.receiveShadow = true;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.mapSize.width = 256;
doorLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.height = 256;
ghost1.shadow.mapSize.width = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.height = 256;
ghost2.shadow.mapSize.width = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.height = 256;
ghost3.shadow.mapSize.width = 256;
ghost3.shadow.camera.far = 7;
