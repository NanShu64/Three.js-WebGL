import * as THREE from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// 引入相机控件`MapControls`
import { MapControls } from 'three/addons/controls/MapControls.js';

import model from "./model.js"; //模型对象

//场景
const scene = new THREE.Scene();
scene.add(model); //模型对象添加到场景中

//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

//光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// 渲染器和相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(202, 123, 125); //第2步：通过相机控件辅助设置OrbitControls
camera.lookAt(0, 0, 0);

const x = 0,
  y = 0,
  z = 0; //通过OrbitControls辅助设置
// 正投影相机
// const width = window.innerWidth; //canvas画布宽度
// const height = window.innerHeight; //canvas画布高度
// const k = width / height; //canvas画布宽高比
// const s = 100; //控制left, right, top, bottom范围大小
// const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 8000);
// camera.position.set(100, 100, 100);
// camera.lookAt(x, y, z);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

//解决加载gltf格式模型颜色偏差问题
renderer.outputEncoding = THREE.sRGBEncoding;

// 渲染循环
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
// 设置相机控件轨道控制器OrbitControls
// const controls = new OrbitControls(camera, renderer.domElement);
const controls = new MapControls(camera, renderer.domElement);

// 缩放范围
controls.minZoom = 0.5;
controls.maxZoom = 2;

controls.target.set(x, y, z); //与lookAt参数保持一致
controls.update(); //update()函数内会执行camera.lookAt(controls.target)




// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
