import * as THREE from "three";

const geometry = new THREE.BoxGeometry(60, 150, 30);
const material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 1,
});
const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh

export default mesh;
