import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 引入后处理扩展库EffectComposer.js
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// 引入渲染器通道RenderPass
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// 引入OutlinePass通道
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';


import model from "./model.js"; //模型对象

import gui from "./gui.js";

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

// 环境光子菜单
const ambientFolder = gui.addFolder("环境光");
ambientFolder.close(); //关闭菜单
// 环境光强度
ambientFolder.add(directionalLight, "intensity", 0, 2).name("环境光强度");
// 平行光子菜单
const dirFolder = gui.addFolder("平行光");
dirFolder.close(); //关闭菜单
// 平行光强度
dirFolder.add(directionalLight, "intensity", 0, 2).name("平行光强度");
const dirFolder2 = dirFolder.addFolder("位置"); //子菜单的子菜单
dirFolder2.close(); //关闭菜单
// 平行光位置
dirFolder2.add(directionalLight.position, "x", -400, 400);
dirFolder2.add(directionalLight.position, "y", -400, 400);
dirFolder2.add(directionalLight.position, "z", -400, 400);
document.getElementById("A").addEventListener("click", function () {
  const A = model.getObjectByName("设备A");
  outlinePass.selectedObjects = [A];
});
document.getElementById("B").addEventListener("click", function () {
  const B = model.getObjectByName("设备B");
  outlinePass.selectedObjects = [B];
});


//渲染器和相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(400, 400, 200);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true, //抗锯齿
});
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// 创建后处理对象EffectComposer，WebGL渲染器作为参数
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// 创建OutlinePass通道
const v2 = new THREE.Vector2(window.innerWidth, window.innerHeight);
const outlinePass = new OutlinePass(v2, scene, camera);
// outlinePass.selectedObjects = [mesh];
outlinePass.visibleEdgeColor.set(0x00ffff);
outlinePass.edgeThickness = 4;
outlinePass.edgeStrength = 6;
composer.addPass(outlinePass);


renderer.outputEncoding = THREE.sRGBEncoding;

// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// 渲染循环
function render() {
    composer.render();
    // renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();
// 渲染循环
// function render() {
//   renderer.render(scene, camera);
//   requestAnimationFrame(render);
// }
// render();

// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
