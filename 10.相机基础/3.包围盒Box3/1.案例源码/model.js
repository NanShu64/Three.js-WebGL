import * as THREE from "three";

const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.8,
});
const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh


const box3 = new THREE.Box3();
box3.expandByObject(mesh); // 计算模型包围盒
console.log("查看包围盒", box3);

const scale = new THREE.Vector3();
// getSize()计算包围盒尺寸
// 获得包围盒长宽高尺寸，结果保存在参数三维向量对象scale中
box3.getSize(scale);
console.log("模型包围盒尺寸", scale);

// 计算包围盒中心坐标
const center = new THREE.Vector3()
box3.getCenter(center)
console.log('模型中心坐标', center);

// // 长方体作为EdgesGeometry参数创建一个新的几何体
// const edges = new THREE.EdgesGeometry(geometry);
// const edgesMaterial = new THREE.LineBasicMaterial({
//   color: 0x00ffff,
// });
// const line = new THREE.LineSegments(edges, edgesMaterial);
// mesh.add(line);

export default mesh;
