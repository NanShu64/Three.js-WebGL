import * as THREE from "three";

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0); // 设置初始位置

export { mesh, };
