import * as THREE from "three";

const geometry = new THREE.SphereGeometry(25, 50, 50);
const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
});
const mesh1 = new THREE.Mesh(geometry, material);
const mesh2 = mesh1.clone();
mesh2.material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
});
mesh2.position.y = 100;
const mesh3 = mesh1.clone();
mesh3.material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
});
mesh3.position.x = 100;
const model = new THREE.Group();
// 三个网格模型mesh1,mesh2,mesh3用于射线拾取测试
model.add(mesh1, mesh2, mesh3);
model.updateMatrixWorld(true);

export { model, mesh1, mesh2, mesh3 };
