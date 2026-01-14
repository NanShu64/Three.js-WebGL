// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import gui from "./gui.js";

const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景
const textureCube = new THREE.CubeTextureLoader()
  .setPath("./环境贴图/")
  .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
textureCube.encoding = THREE.sRGBEncoding;

// 单独.glb文件
loader.load("../../工厂.gltf", function (gltf) {
  model.add(gltf.scene);
  gltf.scene.traverse(function (obj) {
    if (obj.isMesh) {
      //判断是否是网格模型
      obj.material.envMap = textureCube; //设置环境贴图
      obj.material.envMapIntensity = 1.0;
    }
  });
  const obj = {
    envMapIntensity: 1.0,
  };
  gui
    .add(obj, "envMapIntensity", 0, 2)
    .name("环境贴图强度")
    .onChange(function (value) {
      // 递归遍历，批量设置模型材质的`.envMapIntensity`属性
      gltf.scene.traverse(function (obj) {
        if (obj.isMesh) {
          obj.material.envMapIntensity = value;
        }
      });
    });
  });

export default model;
