import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// 引入CSS2渲染器CSS2DRenderer
import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";

import model from "./model.js"; //模型对象

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
// const width = 600;
// const height = 300;
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

// 创建一个CSS2渲染器CSS2DRenderer
const css2Renderer = new CSS2DRenderer();

// width, height：canvas画布宽高度
css2Renderer.setSize(width, height);
document.body.appendChild(css2Renderer.domElement);
css2Renderer.domElement.style.position = "absolute";
css2Renderer.domElement.style.top = "0px";
css2Renderer.domElement.style.pointerEvents = "none";

// renderer.domElement.style.zIndex = 1;
// css2Renderer.domElement.style.zIndex = -1;

renderer.domElement.style.zIndex = -1;
css2Renderer.domElement.style.zIndex = 1;


// 渲染循环
function render() {
  // 用法和webgl渲染器渲染方法类似
  css2Renderer.render(scene, camera);

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

const controls = new OrbitControls(camera, renderer.domElement);

// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  css2Renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
