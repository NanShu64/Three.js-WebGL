// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import createCanvas from "./canvas.js";
// import createSprite from "./sprite.js";
const loader = new GLTFLoader(); //创建一个GLTF加载器
const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景
// 单独.glb文件
loader.load("../../工厂.glb", function (gltf) {
  model.add(gltf.scene);
  const canvas = createCanvas("设备A");
  // canvas画布作为CanvasTexture的参数创建一个纹理对象
  // 本质上你可以理解为CanvasTexture读取参数canvas画布上的像素值
  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
  });
  const sprite = new THREE.Sprite(spriteMaterial);
  const y = 4; //精灵y方向尺寸
  // sprite宽高比和canvas画布保持一致
  const x = (canvas.width / canvas.height) * y; //精灵x方向尺寸
  sprite.scale.set(x, y, 1); // 控制精灵大小
  sprite.position.y = y / 2; //标签底部箭头和空对象标注点重合
  const obj = gltf.scene.getObjectByName("设备A标注"); // obj是建模软件中创建的一个空对象
  obj.add(sprite); //tag会标注在空对象obj对应的位置

  // const canvas1 = createSprite;

});

export default model;
