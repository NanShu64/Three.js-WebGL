import * as THREE from "three";

const shape = new THREE.Shape();
shape.moveTo(0, 0); //.currentPoint变为(10,0)

shape.lineTo(500, 0);
shape.lineTo(500, 500);
shape.lineTo(0, 500);

// ShapeGeometry填充Shape获得一个平面几何体
const geometry = new THREE.ShapeGeometry(shape);
const material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  // transparent: true,
  // opacity: 0.8,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
// 绕 X 轴旋转 90 度
mesh.rotation.x = Math.PI / 2;
export default mesh;
