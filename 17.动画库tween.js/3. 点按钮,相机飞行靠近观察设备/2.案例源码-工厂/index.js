import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
// 引入渲染器通道RenderPass
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
// 引入OutlinePass通道
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";
// 伽马校正后处理Shader
import { GammaCorrectionShader } from "three/addons/shaders/GammaCorrectionShader.js";
// ShaderPass功能：使用后处理Shader创建后处理通道
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import model from "./model.js"; //模型对象
import { SMAAPass } from "three/addons/postprocessing/SMAAPass.js";
import { Tween, Group } from "@tweenjs/tween.js";

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

// 创建后处理对象EffectComposer，WebGL渲染器作为参数
const composer = new EffectComposer(renderer);
//创建一个渲染器通道，场景和相机作为参数
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// OutlinePass第一个参数v2的尺寸和canvas画布保持一致
const v2 = new THREE.Vector2(window.innerWidth, window.innerHeight);
const outlinePass = new OutlinePass(v2, scene, camera);
outlinePass.visibleEdgeColor.set(0x00ffff);
outlinePass.edgeThickness = 4;
outlinePass.edgeStrength = 6;
composer.addPass(outlinePass);

// 创建伽马校正通道
const gammaPass = new ShaderPass(GammaCorrectionShader);
composer.addPass(gammaPass);
// 抗锯齿
const pixlRatio = window.devicePixelRatio;
const smaaPass = new SMAAPass(width * pixlRatio, height * pixlRatio);
composer.addPass(smaaPass);

// 创建一个 Group 来管理所有 tweens
const tweenGroup = new Group();

// 渲染循环
function render() {
  tweenGroup.update(); // 使用 Group 更新动画
  composer.render();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

// 切换到设备A预览状态
document.getElementById("A").addEventListener("click", function () {
  const A = model.getObjectByName("设备A标注");
  const pos = new THREE.Vector3();
  A.getWorldPosition(pos); //获取三维场景中某个对象世界坐标
  // 相机飞行到的位置和观察目标拉开一定的距离
  const pos2 = pos.clone().addScalar(30);
  createCameraTween(pos2, controls.target);
});
// 切换到设备B的预览状态
document.getElementById("B").addEventListener("click", function () {
  const B = model.getObjectByName("设备B标注");
  const pos = new THREE.Vector3();
  B.getWorldPosition(pos); //获取三维场景中某个对象世界坐标
  // 相机飞行到的位置和观察目标拉开一定的距离
  const pos2 = pos.clone().addScalar(30);
  // 相机从当前位置camera.position飞行三维场景中某个世界坐标附近
  createCameraTween(pos2, controls.target);
});

// 切换到设备停车场的预览状态
document.getElementById("car").addEventListener("click", function () {
  const car = model.getObjectByName("停车场标注");
  const pos = new THREE.Vector3();
  car.getWorldPosition(pos); //获取三维场景中某个对象世界坐标
  // 相机飞行到的位置和观察目标拉开一定的距离
  const pos2 = pos.clone().addScalar(30);
  // 相机从当前位置camera.position飞行三维场景中某个世界坐标附近
  createCameraTween(pos2, pos);
});

// 相机整体预览对应的位置和观察目标
const cameraPos0 = new THREE.Vector3(202, 123, 125);
const target0 = new THREE.Vector3(0, 0, 0);
// 切换整体预览状态
document.getElementById("all").addEventListener("click", function () {
  // 相机从当前位置camera.position回到整体预览状态
  createCameraTween(cameraPos0, target0);
});

// 相机动画函数，从A点飞行到B点，A点表示相机当前所处状态
// pos: 三维向量Vector3，表示动画结束相机位置
// target: 三维向量Vector3，表示相机动画结束lookAt指向的目标观察点
function createCameraTween(endPos, endTarget) {
  // 创建相机动画
  const tween = new Tween({
    // 不管相机此刻处于什么状态，直接读取当前的位置和目标观察点
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
    tx: controls.target.x,
    ty: controls.target.y,
    tz: controls.target.z,
  })
    .to(
      {
        // 动画结束相机位置坐标
        x: endPos.x,
        y: endPos.y,
        z: endPos.z,
        // 动画结束相机指向的目标观察点
        tx: endTarget.x,
        ty: endTarget.y,
        tz: endTarget.z,
      },
      2000
    )
    .onUpdate(function (obj) {
      // 动态改变相机位置
      camera.position.set(obj.x, obj.y, obj.z);
      // 动态计算相机视线
      // camera.lookAt(obj.tx, obj.ty, obj.tz);
      controls.target.set(obj.tx, obj.ty, obj.tz);
      controls.update(); //内部会执行.lookAt()
    })
    .onComplete(function (obj) {
      controls.target.set(obj.tx, obj.ty, obj.tz);
      controls.update();
    })
    .start();

  // 将 tween 添加到组中
  tweenGroup.add(tween);
}
