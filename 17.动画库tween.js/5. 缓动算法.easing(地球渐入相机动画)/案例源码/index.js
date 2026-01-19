import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Tween, Group, Easing } from "@tweenjs/tween.js";
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

//渲染器和相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(3000, 3000, 3000);
camera.lookAt(0, 0, 0);

// 创建一个 Group 来管理所有 tweens
const tweenGroup = new Group();
// 视觉效果：地球从小到大出现(透视投影相机远小近大投影规律)
const tween = new Tween(camera.position)
  .to({ x: 300, y: 300, z: 300 }, 3000)
  //   .easing(Easing.Sinusoidal.InOut) //进入和结束都设置缓动
  .easing(Easing.Quadratic.Out) //使用二次缓动函数
  .start();

// 将 tween 添加到组中
tweenGroup.add(tween);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// 渲染循环
function render() {
  tweenGroup.update();
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
