import * as THREE from "three";

// 引入CSS2模型对象CSS2DObject
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";

const group = new THREE.Group();

const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(25, 0, 25);
group.add(mesh);

const div = document.getElementById("tag");
// HTML元素转化为threejs的CSS2模型对象
const tag = new CSS2DObject(div);
tag.position.set(50, 0, 50);
group.add(tag);

export default group;
