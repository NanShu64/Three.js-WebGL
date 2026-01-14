// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// import gui from "./gui.js";

const texture = new THREE.TextureLoader().load("./光点.png");
const spriteMaterial = new THREE.SpriteMaterial({
  map: texture, //设置精灵纹理贴图
});
// 创建精灵模型对象，不需要几何体geometry参数
const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(10, 10, 1); //只需要设置x、y两个分量就可以
sprite.position.set(0, 100, 0); //设置位置，要考虑sprite尺寸影响

const geometry = new THREE.BoxGeometry(25, 100, 50);
geometry.translate(0, 50, 0);
const material = new THREE.MeshBasicMaterial({
  color: 0x90a4ae, //设置颜色
});
// mesh顶部中心添加标注，顶部中心坐标是(0,100,0)
const mesh = new THREE.Mesh(geometry, material);

const group = new THREE.Group();
group.add(mesh);
group.add(sprite);
// // 创建材质子菜单
// const matFolder = gui.addFolder("玻璃材质");
// matFolder.close(); //关闭菜单

// const loader = new GLTFLoader(); //创建一个GLTF加载器

// const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景
// // 加载环境贴图
// const textureCube = new THREE.CubeTextureLoader()
//   .setPath("../../环境贴图/环境贴图1/")
//   .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
// textureCube.encoding = THREE.sRGBEncoding; //设置纹理贴图编码方式和WebGL渲染器一致
// loader.load("../../轿车.glb", function (gltf) {
//   model.add(gltf.scene);
//   const mesh = gltf.scene.getObjectByName("玻璃01");
//   mesh.material = new THREE.MeshPhysicalMaterial({
//     metalness: 0.0, //玻璃非金属
//     roughness: 0.0, //玻璃表面光滑
//     envMap: textureCube, //环境贴图
//     envMapIntensity: 1.0, //环境贴图对Mesh表面影响程度
//     transmission: 1.0, //玻璃材质透光率，transmission替代opacity
//     ior: 2.5, //折射率
//   });

//   const obj = {
//     color: mesh.material.color.getHex(), // 获取材质默认颜色
//   };
//   // 材质颜色color
//   matFolder.addColor(obj, "color").onChange(function (value) {
//     mesh.material.color.set(value);
//   });
//   // 范围可以参考文档
//   matFolder.add(mesh.material, "metalness", 0, 1);
//   matFolder.add(mesh.material, "roughness", 0, 1);
//   matFolder.add(mesh.material, "transmission", 0, 1);
//   matFolder.add(mesh.material, "ior", 1, 2.333);
//   matFolder.add(mesh.material, "envMapIntensity", 0, 10);
// });
export default group;
