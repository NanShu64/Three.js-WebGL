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

// 渲染循环
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

const controls = new OrbitControls(camera, renderer.domElement);

renderer.domElement.addEventListener("click", function (event) {
  // .offsetY、.offsetX以canvas画布左上角为坐标原点,单位px
  const px = event.offsetX;
  const py = event.offsetY;
  //屏幕坐标px、py转WebGL标准设备坐标x、y
  //width、height表示canvas画布宽高度
  // const x = (px / width) * 2 - 1;
  // const y = -(py / height) * 2 + 1;
  const width = window.innerWidth - 200;
  const height = window.innerHeight - 60;
  //屏幕坐标转WebGL标准设备坐标
  const x = (px / width) * 2 - 1;
  const y = -(py / height) * 2 + 1;

  //创建一个射线投射器`Raycaster`
  const raycaster = new THREE.Raycaster();
  //.setFromCamera()计算射线投射器`Raycaster`的射线属性.ray
  // 形象点说就是在点击位置创建一条射线，射线穿过的模型代表选中
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
  //.intersectObjects([mesh1, mesh2, mesh3])对参数中的网格模型对象进行射线交叉计算
  // 未选中对象返回空数组[],选中一个对象，数组1个元素，选中两个对象，数组两个元素
  const intersects = raycaster.intersectObjects([mesh1, mesh2, mesh3]);
  console.log("射线器返回的对象", intersects);
  // intersects.length大于0说明，说明选中了模型
  if (intersects.length > 0) {
    // 选中模型的第一个模型，设置为红色
    intersects[0].object.material.color.set(0xff0000);
  }
});

// 画布跟随窗口变化
window.onresize = function () {
  const width = window.innerWidth - 200; //canvas画布高度
  const height = window.innerHeight - 60; //canvas画布宽度
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // 其它CSS代码，与threejs无关
  document.getElementById("left").style.height = height + "px";
};
