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
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambient);

//渲染器和相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(100, 40, 80);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true, //抗锯齿
});
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

renderer.outputEncoding = THREE.sRGBEncoding;

// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// 渲染循环
function render() {
  // 用法和webgl渲染器渲染方法类似
  css2Renderer.render(scene, camera);

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  css2Renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
};
