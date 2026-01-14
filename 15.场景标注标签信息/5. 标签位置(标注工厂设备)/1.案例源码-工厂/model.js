// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景

// // 单独.glb文件
// loader.load("../../工厂.gltf", function (gltf) {
//   model.add(gltf.scene);
//   const div = document.getElementById("tag");
//   const tag = new CSS2DObject(div);

//   const obj = gltf.scene.getObjectByName('大货车1');

//   // 可视化工厂设备obj的局部坐标系
//   const axesHelper = new THREE.AxesHelper(30);
//   obj.add(axesHelper);

//   obj.add(tag);
// });
// 单独.glb文件
loader.load("../../工厂.glb", function (gltf) {
  model.add(gltf.scene);
  const div = document.getElementById("tag");
  const tag = new CSS2DObject(div);

  // const obj = gltf.scene.getObjectByName("大货车1");
  const obj = gltf.scene.getObjectByName("空物体");
  // 可视化工厂设备obj的局部坐标系
  const axesHelper = new THREE.AxesHelper(30);
  obj.add(axesHelper);

  obj.add(tag);
});

//标签tag作为obj子对象，默认标注在obj的局部坐标系坐标原点

export default model;
