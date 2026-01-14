import * as THREE from "three";
// 引入CSS2模型对象CSS2DObject
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
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
const div = document.getElementById("tag");
// HTML元素转化为threejs的CSS2模型对象
const tag = new CSS2DObject(div);
tag.position.set(50, 0, 50);
model.add(tag);
export { model, mesh1, mesh2, mesh3 };
