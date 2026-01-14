import * as THREE from "three";

const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.8,
});

const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
const mesh1 = mesh.clone();
mesh1.position.set(100, 0, 0);
const mesh2 = mesh.clone();
mesh2.position.set(0, 100, 0);
const model = new THREE.Group(); //模型对象Group
model.add(mesh, mesh1, mesh2);

export { model, mesh, mesh1, mesh2 };
