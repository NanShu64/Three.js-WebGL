import * as THREE from "three";


const geometry = new THREE.PlaneGeometry(850, 850);
// 平面
const material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
// 绕 X 轴旋转 90 度
mesh.rotation.x = Math.PI / 2;

// 添加矩形几何体
const geometry1 = new THREE.BoxGeometry(50, 50, 50);
const material1 = new THREE.MeshLambertMaterial({
  color: 0x00b7ce,
  side: THREE.DoubleSide,
});
const mesh1 = new THREE.Mesh(geometry1, material1);
mesh1.position.set(100, 50, 100); // 设置位置

const group = new THREE.Group();
group.add(mesh1);

// 设置产生投影的网格模型
mesh1.castShadow = true;

// 设置接收阴影的投影面
mesh.receiveShadow = true;

for (let i = -3; i < 4; i++) {
  const mesh2 = mesh1.clone();
  // 设置产生投影的网格模型
  mesh2.castShadow = true;
  mesh2.position.z = 100 * i;
  group.add(mesh2);
}

export default {mesh, mesh1, group};