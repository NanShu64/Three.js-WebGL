// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import gui from "./gui.js";

const group = new THREE.Group();
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

const texture = new THREE.TextureLoader().load("./雪花.png");
const spriteMaterial = new THREE.SpriteMaterial({
  map: texture,
});

for (let i = 0; i < 16000; i++) {
  // 精灵模型共享材质
  const sprite = new THREE.Sprite(spriteMaterial);
  group.add(sprite);
  sprite.scale.set(1, 1, 1);
  // 设置精灵模型位置，在长方体空间上上随机分布
  const x = 1000 * (Math.random() - 0.5);
  const y = 600 * Math.random();
  const z = 1000 * (Math.random() - 0.5);
  sprite.position.set(x, y, z);
}
// function loop() {
//   // loop()每次执行都会更新雨滴的位置，进而产生动画效果
//   group.children.forEach((sprite) => {
//     // 雨滴的y坐标每次减1
//     sprite.position.y -= 1;
//     if (sprite.position.y < 0) {
//       // 如果雨滴落到地面，重置y，从新下落
//       sprite.position.y = 600;
//     }
//   });
//   requestAnimationFrame(loop);
// }
// loop();

const clock = new THREE.Clock();
function loop() {
  // loop()两次执行时间间隔
  const t = clock.getDelta();
  group.children.forEach((sprite) => {
    // 雨滴的y坐标每次减t*60
    sprite.position.y -= t * 30;
    if (sprite.position.y < 0) {
      sprite.position.y = 600;
    }
  });
  requestAnimationFrame(loop);
}
loop();



// group.add(model); //模型对象添加到组对象中





export { group, model };
