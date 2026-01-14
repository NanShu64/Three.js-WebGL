import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { model, mesh1, mesh2, mesh3 } from "./model.js"; //模型对象

//场景
const scene = new THREE.Scene();
scene.add(model); //模型对象添加到场景中

//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

//光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

//相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(292, 223, 185);
camera.lookAt(0, 0, 0);

// WebGL渲染器设置
const renderer = new THREE.WebGLRenderer({
  antialias: true, //开启优化锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);


// 渲染循环
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

const controls = new OrbitControls(camera, renderer.domElement);


// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

const raycaster = new THREE.Raycaster();
console.log("射线属性", raycaster.ray);
// 设置射线起点
raycaster.ray.origin = new THREE.Vector3(-100, 0, 0);
// 设置射线起点
// raycaster.ray.origin.set(0, 0, 0);
// 设置射线方向射线方向沿着x轴
raycaster.ray.direction = new THREE.Vector3(1, 0, 0);
const intersects = raycaster.intersectObjects([mesh1, mesh2, mesh3]);
console.log("射线器返回的对象", intersects);

if (intersects.length > 0) {
  console.log("交叉点坐标", intersects[0].point);
  console.log("交叉对象", intersects[0].object);
  console.log("射线原点和交叉点距离", intersects[0].distance);
  // 选中模型的第一个模型，设置为红色
  intersects[0].object.material.color.set(0xff0000);
  // 选中模型的第二个模型，设置为蓝色
  intersects[1].object.material.color.set(0x0000ff);
  // 选中模型的第三个模型，设置为绿色
  intersects[2].object.material.color.set(0x0ff000);
}

