import * as THREE from "three";

const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([100, 25, 0, 100, -25, 25, 100, -25, -25]);
//创建属性缓冲区对象
const attribue = new THREE.BufferAttribute(vertices, 3); // 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue;
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff, //材质颜色
  side: THREE.FrontSide, //默认只有正面可见
  // side:THREE.BackSide,//设置只有背面可见
  // side:THREE.DoubleSide,//两面可见
});
//网格模型本质:一个一个三角形(面)构成
const mesh = new THREE.Mesh(geometry, material);

// 创建射线对象Ray
const ray = new THREE.Ray();
// 设置射线起点
ray.origin = new THREE.Vector3(1, 0, 3);

ray.direction = new THREE.Vector3(-5, 0, 0).normalize();
console.log("ray", ray);

// 三角形三个点坐标
const p1 = new THREE.Vector3(100, 25, 0);
const p2 = new THREE.Vector3(100, -25, 25);
const p3 = new THREE.Vector3(100, -25, -25);
const point = new THREE.Vector3();//用来记录射线和三角形的交叉点
// `.intersectTriangle()`计算射线和三角形是否相交叉，相交返回交点，不相交返回null
const result = ray.intersectTriangle(p1,p2,p3,false,point);
console.log('交叉点坐标', point);
console.log('查看是否相交', result);






export default mesh;
