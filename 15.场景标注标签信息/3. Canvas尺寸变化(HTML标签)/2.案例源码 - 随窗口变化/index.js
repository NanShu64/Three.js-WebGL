import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// 引入CSS2渲染器CSS2DRenderer
import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
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
// const width = 600;//canvas画布高度
// const height = 400;//canvas画布宽度
// 200表示左侧div元素宽度195px+间距5px
const width = window.innerWidth - 200; //canvas画布高度
//60表示顶部div元素高度55px+间距5px
const height = window.innerHeight - 60; //canvas画布宽度

const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(292, 223, 185);
camera.lookAt(0, 0, 0);

// WebGL渲染器设置
const renderer = new THREE.WebGLRenderer({
  antialias: true, //开启优化锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
renderer.setSize(width, height);
// document.body.appendChild(renderer.domElement);

document.getElementById("webgl").appendChild(renderer.domElement);


renderer.setClearColor(0x444444);



// 创建一个CSS2渲染器CSS2DRenderer
const css2Renderer = new CSS2DRenderer();
// width, height：canvas画布宽高度
css2Renderer.setSize(width, height);
document.getElementById("webgl").appendChild(css2Renderer.domElement);
css2Renderer.domElement.style.position = "absolute";
css2Renderer.domElement.style.top = "0px";
css2Renderer.domElement.style.pointerEvents = "none";

// 渲染循环
function render() {
   css2Renderer.render(scene, camera);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

const controls = new OrbitControls(camera, renderer.domElement);

// 画布跟随窗口变化
window.onresize = function () {
  const width = window.innerWidth - 200; //canvas画布高度
  const height = window.innerHeight - 60; //canvas画布宽度
  renderer.setSize(width, height);
  css2Renderer.setSize(width, height);

  camera.aspect = width / height;

  camera.updateProjectionMatrix();

  // 其它CSS代码，与threejs无关
  document.getElementById("left").style.height = height + "px";
};
