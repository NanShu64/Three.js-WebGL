// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景

const texLoader = new THREE.TextureLoader();
// 加载手机mesh另一个颜色贴图
const texture = texLoader.load("./黑色.png");
texture.encoding = THREE.sRGBEncoding; //和渲染器.outputEncoding一样值
// 纹理对象texture.flipY默认值
console.log("texture.flipY", texture.flipY);
loader.load("../手机模型.glb", function (gltf) {
  console.log("gltf.scene", gltf.scene);
  const mesh = gltf.scene.children[0]; //获取Mesh
  mesh.material.map = texture; //更换不同风格的颜色贴图
  model.add(gltf.scene);
});


export default model;
