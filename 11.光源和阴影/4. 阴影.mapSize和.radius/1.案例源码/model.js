import * as THREE from "three";


const geometry = new THREE.PlaneGeometry(1000, 1000, 2, 1);

const material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  // transparent: true,
  // opacity: 0.8,
  side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
// 绕 X 轴旋转 90 度
mesh.rotation.x = Math.PI / 2;

// 添加第二个矩形几何体
const geometry1 = new THREE.BoxGeometry(50, 50, 50);
const material1 = new THREE.MeshLambertMaterial({
  color: 0x00b7ce,
  side: THREE.DoubleSide,
});
const mesh1 = new THREE.Mesh(geometry1, material1);
mesh1.position.set(100, 50, 100); // 设置位置
// 设置产生投影的网格模型
mesh1.castShadow = true;
// 设置接收阴影的投影面
mesh.receiveShadow = true;

export default {mesh, mesh1};
